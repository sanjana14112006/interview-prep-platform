import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { InterviewContext } from "../interview.context";
import { 
    getAllInterviewReports, 
    generateInterviewReport, 
    getInterviewReportById, 
    generateResumePdf 
} from "../services/interview.api";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
        } catch (error) {
            console.error("Error generating report:", error);
        } finally {
            setLoading(false);
        }

        return response?.interviewReport;
    };

    const getReportById = async (id) => {
        setLoading(true);
        let response = null;
        try {
            response = await getInterviewReportById(id);
            setReport(response.interviewReport);
        } catch (error) {
            console.error("Error fetching report by ID:", error);
        } finally {
            setLoading(false);
        }
        return response?.interviewReport;
    };

    const getReports = async () => {
        setLoading(true);
        let response = null;
        try {
            response = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (error) {
            console.error("Error fetching all reports:", error);
        } finally {
            setLoading(false);
        }

        return response?.interviewReports;
    };

    const getResumePdf = async (interviewReportId) => {
        setLoading(true);
        try {
            const blobData = await generateResumePdf(interviewReportId);
            const blob = new Blob([blobData], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Tailored_ATS_Resume_${interviewReportId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Resume PDF download failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        } else {
            getReports();
        }
    }, [interviewId]);

    return { 
        loading, 
        report, 
        reports, 
        generateReport, 
        getReportById, 
        getReports, 
        getResumePdf 
    };
};