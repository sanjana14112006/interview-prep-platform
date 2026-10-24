const pdfParse = require("pdf-parse");
const { 
    generateInterviewReport, 
    generateResumePdf, 
    evaluateInterviewAnswer 
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        let resumeText = "";

        if (req.file && req.file.buffer) {
            const parser = new pdfParse.PDFParse(Uint8Array.from(req.file.buffer));
            const resumeContent = await parser.getText();
            resumeText = resumeContent.text;
        }

        const { selfDescription, jobDescription } = req.body;

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        });

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });
    } catch (err) {
        console.error("Interview Controller Error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message || err
        });
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({ 
            _id: interviewId, 
            user: req.user.id 
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        return res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        });
    } catch (err) {
        console.error("Get Report Error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message || err
        });
    }
}

/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        });
    } catch (err) {
        console.error("Get All Reports Error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message || err
        });
    }
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params;

        const interviewReport = await interviewReportModel.findById(interviewReportId);

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        const { resume, jobDescription, selfDescription } = interviewReport;

        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        });

        return res.send(pdfBuffer);
    } catch (err) {
        console.error("Generate Resume PDF Error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message || err
        });
    }
}

/**
 * @description Controller to evaluate spoken candidate answers using Gemini.
 */
async function evaluateAnswerController(req, res) {
    try {
        const { question, intention, answer, frames } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ message: "Question and answer are required." });
        }

        const evaluation = await evaluateInterviewAnswer({ question, intention, answer, frames });
        return res.status(200).json({ evaluation });
    } catch (err) {
        console.error("Evaluation Error:", err);
        return res.status(500).json({ 
            message: "Error evaluating answer", 
            error: err.message || err 
        });
    }
}



module.exports = { 
    generateInterViewReportController, 
    getInterviewReportByIdController, 
    getAllInterviewReportsController, 
    generateResumePdfController,
    evaluateAnswerController
};