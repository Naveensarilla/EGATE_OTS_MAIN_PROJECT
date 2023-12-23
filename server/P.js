app.post("/upload", upload.single("document"), async (req, res) => {
  const docxFilePath = `uploads/${req.file.filename}`;
  const outputDir = `uploads/${req.file.originalname}_images`;

  const docName = `${req.file.originalname}`;
  try {
    // Check if a document with the same name already exists
    const [existingDoc] = await db.query(
      "SELECT document_Id FROM ots_document WHERE documen_name = ?",
      [docName]
    );

    if (existingDoc.length > 0) {
      return res
        .status(409)
        .send("Document with the same name already exists.");
    }

    let existingTestSubjectDoc;

    // Check if a section is specified
    if (req.body.sectionId) {
      // Check if a document with the same test, subject, and section already exists
      [existingTestSubjectDoc] = await db.query(
        "SELECT document_Id FROM ots_document WHERE testCreationTableId = ? AND subjectId = ? AND sectionId = ?",
        [req.body.testCreationTableId, req.body.subjectId, req.body.sectionId]
      );
    } else {
      // Check if a document with the same test and subject already exists
      [existingTestSubjectDoc] = await db.query(
        "SELECT document_Id FROM ots_document WHERE testCreationTableId = ? AND subjectId = ? AND sectionId IS NULL",
        [req.body.testCreationTableId, req.body.subjectId]
      );
    }

    if (existingTestSubjectDoc.length > 0) {
      return res
        .status(409)
        .send(
          "Document with the same test, subject, and section already exists."
        );
    }
    await fs.mkdir(outputDir, { recursive: true });
    const result = await mammoth.convertToHtml({ path: docxFilePath });
    const htmlContent = result.value;
    const $ = cheerio.load(htmlContent);
    const textResult = await mammoth.extractRawText({ path: docxFilePath });
    const textContent = textResult.value;
    const textSections = textContent.split("\n\n");

    // Insert documentName and get documentId
    const [documentResult] = await db.query("INSERT INTO ots_document SET ?", {
      documen_name: docName,
      testCreationTableId: req.body.testCreationTableId,
      subjectId: req.body.subjectId,
      sectionId: req.body.sectionId,
    });
    const document_Id = documentResult.insertId;

    // Get all images in the order they appear in the HTML
    const images = [];
    $("img").each(function (i, element) {
      const base64Data = $(this)
        .attr("src")
        .replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");
      images.push(imageBuffer);
    });

    let j = 0;
    let Question_id;
    let question_id = [];
    for (let i = 0; i < images.length; i++) {
      if (j == 0) {
        const questionRecord = {
          question_img: images[i],
          testCreationTableId: req.body.testCreationTableId,
          sectionId: req.body.sectionId,
          document_Id: document_Id,
          subjectId: req.body.subjectId,
        };
        console.log(j);
        Question_id = await insertRecord("questions", questionRecord);
        question_id.push(Question_id);
        j++;
      } else if (j > 0 && j < 5) {
        const optionRecord = {
          option_img: images[i],
          question_id: Question_id,
        };
        console.log(j);
        await insertRecord("options", optionRecord);
        j++;
      } else if (j == 5) {
        const solutionRecord = {
          solution_img: images[i],
          question_id: Question_id,
        };
        console.log(j);
        await insertRecord("solution", solutionRecord);
        j = 0;
      }
    }

    let que_id;
    let qtypeMappings = {
      mcq: 1,
      msq: 2,
      nsq: 3,
      "True/False Questions": 4,
    };

    for (let i = 0; i < textSections.length; i++) {
      if (textSections[i].startsWith("[qtype]")) {
        que_id = question_id[j];
        j++;
        const qtypeText = textSections[i]
          .replace("[qtype]", "")
          .trim()
          .toLowerCase();
        // Save in the qtype table
        if (qtypeMappings.hasOwnProperty(qtypeText)) {
          // Save in the qtype table
          const qtypeRecord = {
            qtype_text: textSections[i].replace("[qtype]", ""),
            question_id: que_id,
            quesionTypeId: qtypeMappings[qtypeText],
          };
          await insertRecord("qtype", qtypeRecord);
        } else {
          // Handle invalid qtypeText
          console.error(`Invalid qtype text: ${qtypeText}`);
          // You can choose to throw an error, skip the record, or handle it in any other way.
        }
      } else if (textSections[i].startsWith("[ans]")) {
        // Save in the answer table
        const answerRecord = {
          answer_text: textSections[i].replace("[ans]", ""),
          question_id: que_id,
        };
        await insertRecord("answer", answerRecord);
      } else if (textSections[i].startsWith("[Marks]")) {
        // Save in the marks table
        const marksRecord = {
          marks_text: textSections[i].replace("[Marks]", ""),
          question_id: que_id,
        };
        await insertRecord("marks", marksRecord);
      }
    }
    res.send(
      "Text content and images extracted and saved to the database with the selected topic ID successfully."
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error extracting content and saving it to the database.");
  }
});

async function insertRecord(table, record) {
  try {
    const [result] = await db.query(`INSERT INTO ${table} SET ?`, record);
    console.log(`${table} id: ${result.insertId}`);
    return result.insertId;
  } catch (err) {
    console.error(`Error inserting data into ${table}: ${err}`);
    throw err;
  }
}
















app.post("/upload", upload.single("document"), async (req, res) => {
  const docxFilePath = `uploads/${req.file.filename}`;
  const outputDir = `uploads/${req.file.originalname}_images`;

  const docName = `${req.file.originalname}`;
  try {
    // Check if a document with the same name already exists
    const [existingDoc] = await db.query(
      "SELECT document_Id FROM ots_document WHERE documen_name = ?",
      [docName]
    );

    if (existingDoc.length > 0) {
      return res
        .status(409)
        .send("Document with the same name already exists.");
    }

    let existingTestSubjectDoc;

    // Check if a section is specified
    if (req.body.sectionId) {
      // Check if a document with the same test, subject, and section already exists
      [existingTestSubjectDoc] = await db.query(
        "SELECT document_Id FROM ots_document WHERE testCreationTableId = ? AND subjectId = ? AND sectionId = ?",
        [req.body.testCreationTableId, req.body.subjectId, req.body.sectionId]
      );
    } else {
      // Check if a document with the same test and subject already exists
      [existingTestSubjectDoc] = await db.query(
        "SELECT document_Id FROM ots_document WHERE testCreationTableId = ? AND subjectId = ? AND sectionId IS NULL",
        [req.body.testCreationTableId, req.body.subjectId]
      );
    }

    if (existingTestSubjectDoc.length > 0) {
      return res
        .status(409)
        .send(
          "Document with the same test, subject, and section already exists."
        );
    }
    await fs.mkdir(outputDir, { recursive: true });
    const result = await mammoth.convertToHtml({ path: docxFilePath });
    const htmlContent = result.value;
    const $ = cheerio.load(htmlContent);
    const textResult = await mammoth.extractRawText({ path: docxFilePath });
    const textContent = textResult.value;
    const textSections = textContent.split("\n\n");

    // Insert documentName and get documentId
    const [documentResult] = await db.query("INSERT INTO ots_document SET ?", {
      documen_name: docName,
      testCreationTableId: req.body.testCreationTableId,
      subjectId: req.body.subjectId,
      sectionId: req.body.sectionId,
    });
    const document_Id = documentResult.insertId;

    // Get all images in the order they appear in the HTML
    // Change instances of "question_id" to "que_id"
    // Change instances of "question_id" to "que_id"
    const images = [];
    const imageInfo = [];
    $("img").each(function (i, element) {
      const base64Data = $(this)
        .attr("src")
        .replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");
      images.push(imageBuffer);
      const type = $(this).data("type");
      imageInfo.push({ type, index: i });
    });

    let que_id;
    imageInfo.sort((a, b) => a.index - b.index);

    let optionIndex = 0;
    const QUESTION_MARK = "[Q]";
    const ANSWER_MARK = "[ans]";
    const MARKS_MARK = "[Marks]";
    const QTYPE_MARK = "[qtype]";
    const SOLUTION_MARK = "[soln]";
    const OPTION_MARKERS = ["(a)", "(b)", "(c)", "(d)"];

    let j = 0;
    console.log("Number of images:", images.length);
    console.log("Number of imageInfo entries:", imageInfo.length);
    for (let i = 0; i < images.length; i++) {
      try {
        const currentImageInfo = imageInfo[i];
        console.log(
          "Current Image Info:",
          currentImageInfo,
          "and",
          imageInfo.length[1]
        );
        if (!currentImageInfo || !currentImageInfo.type) {
          console.error(`Image info is undefined or null for image ${i + 1}`);
          continue; // Skip this iteration and move to the next image
        }

        const imageType = currentImageInfo.type;
        console.log("Image Type:", imageType);
        console.log("Image Type:", imageType);

        if (imageType === QUESTION_MARK) {
          // Save question content in the questions table
          const questionRecord = {
            question_img: images[i],
            testCreationTableId: req.body.testCreationTableId,
            sectionId: req.body.sectionId,
            document_Id: document_Id,
            subjectId: req.body.subjectId,
          };
          que_id = await insertRecord("questions", questionRecord);
          j++;
        } else if (
          imageType &&
          OPTION_MARKERS.some((marker) => imageType.startsWith(marker))
        ) {
          // Process option images
          const optionRecord = {
            option_img: images[i],
            question_id: que_id,
            option_marker: OPTION_MARKERS[j - 1],
          };
          await insertRecord("options", optionRecord);
          j++;
        } else if (imageType === SOLUTION_MARK) {
          // Process solution image
          const solutionRecord = {
            solution_img: images[i],
            question_id: que_id,
          };
          await insertRecord("solution", solutionRecord);
          j = 0;
        }
      } catch (error) {
        console.error(`Error processing image ${i + 1}: ${error.message}`);
      }
    }

    j = 0;

    const qtypeMappings = {
      mcq: 1,
      msq: 2,
      nsq: 3,
      "True/False Questions": 4,
    };

    for (let i = 0; i < textSections.length; i++) {
      if (textSections[i].startsWith(QTYPE_MARK)) {
        // Process qtype
        const qtypeText = textSections[i]
          .replace(QTYPE_MARK, "")
          .trim()
          .toLowerCase();
        if (qtypeMappings.hasOwnProperty(qtypeText)) {
          const qtypeRecord = {
            qtype_text: qtypeText,
            question_id: que_id,
            quesionTypeId: qtypeMappings[qtypeText],
          };
          await insertRecord("qtype", qtypeRecord);
        } else {
          console.error(`Invalid qtype text: ${qtypeText}`);
        }
      } else if (textSections[i].startsWith(ANSWER_MARK)) {
        // Process answer
        const answerRecord = {
          answer_text: textSections[i].replace(ANSWER_MARK, ""),
          question_id: que_id,
        };
        await insertRecord("answer", answerRecord);
      } else if (textSections[i].startsWith(MARKS_MARK)) {
        // Process marks
        const marksRecord = {
          marks_text: textSections[i].replace(MARKS_MARK, ""),
          question_id: que_id,
        };
        await insertRecord("marks", marksRecord);
      }
    }
    res.send(
      "Text content and images extracted and saved to the database with the selected topic ID successfully."
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error extracting content and saving it to the database.");
  }
});

async function insertRecord(table, record) {
  try {
    const [result] = await db.query(`INSERT INTO ${table} SET ?`, record);
    console.log(`${table} id: ${result.insertId}`);
    return result.insertId;
  } catch (err) {
    console.error(`Error inserting data into ${table}: ${err}`);
    throw err;
  }
}