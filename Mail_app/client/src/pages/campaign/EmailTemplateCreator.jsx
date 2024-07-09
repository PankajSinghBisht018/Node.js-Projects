import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmailEditor from 'react-email-editor';
import sample from './savefile.json';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; 
import { Button } from '@mui/material';
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailTemplateCreator = () => {
  const location = useLocation();
  const emailEditorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  useEffect(() => {
    if (editorLoaded) {
      onLoad();
    }
  }, [editorLoaded]);

  const handleEditorLoad = () => {
    setEditorLoaded(true);
  };

  const onLoad = () => {
    const { state } = location;
    if (state && state.design) {
      emailEditorRef.current.editor.loadDesign(state.design);
    } else {
      emailEditorRef.current.editor.loadDesign(sample);
    }
  };

  const exportHtml = () => {
    return new Promise((resolve, reject) => {
      if (emailEditorRef.current && emailEditorRef.current.editor) {
        emailEditorRef.current.editor.exportHtml((data) => {
          if (data) {
            const { html, design } = data;
            resolve({ html, design });
          } else {
            reject(new Error('Failed to export HTML'));
          }
        });
      } else {
        reject(new Error('Email editor is not ready.'));
      }
    });
  };

  const saveDesign = () => {
    if (emailEditorRef.current && emailEditorRef.current.editor) {
      emailEditorRef.current.editor.saveDesign((design) => {
        console.log('Saved Design:', JSON.stringify(design, null, 2));
        toast.success('Design JSON has been logged in your developer console.');
      });
    } else {
      console.error('Email editor is not ready.');
      toast.error('Email editor is not ready.');
    }
  };

  const sendEmail = async () => {
    const { from, to, subject, campaignName } = location.state || {};

    if (!from || !to || !subject || !campaignName) {
      console.error('Missing required data (from, to, subject, campaignName)');
      toast.error('Missing required data (from, to, subject, campaignName)');
      return;
    }

    try {
      const { html, design } = await exportHtml();

      axios.post('http://localhost:8000/api/temp-email', {
        from,
        to,
        subject,
        campaignName,
        htmlContent: html || '<p>Default email content goes here.</p>',
        design: JSON.stringify(design),
        recipients: to.split(',').map(email => email.trim()), 
      })
      .then(response => {
        console.log('Email sent successfully', response);
        toast.success('Email sent successfully');
      })
      .catch(error => {
        console.error('Error sending email', error);
        toast.error('Error sending email');
      });
    } catch (error) {
      console.error('Error exporting HTML', error);
      toast.error('Error exporting HTML');
    }
  };

  const generateEmailContent = async () => {
    const { subject } = location.state || {};

    if (!subject) {
      toast.error('Subject is missing');
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyAZDaf7usmQ7am6FfWC7J367UKFLalBqUo'); 
      const model = genAI.getGenerativeModel({ model: "gemini-pro" }); 

      const prompt = `email templates content related to ${subject}`; 

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setGeneratedContent(text);
    } catch (error) {
      console.error('Error generating email content:', error);
      toast.error('Error generating email content');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent).then(() => {
      toast.success('Content copied to clipboard');
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast.error('Could not copy text');
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Email Template Editor</h1>
      
      <div className="mb-4 flex justify-center items-center">
        <EmailEditor ref={emailEditorRef} onLoad={handleEditorLoad} minHeight="70vh" />
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={saveDesign}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Save Design
        </Button>
        <Button
          onClick={exportHtml}
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
        >
          Export HTML
        </Button>
        <Button
          onClick={sendEmail}
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
        >
          Send Email
        </Button>
        <Button
          onClick={generateEmailContent}
          variant="contained"
          color="primary"
          startIcon={<PsychologyIcon />} 
        >
          Generate Email Content
        </Button>
      </div>

      {generatedContent && (
        <div className="mt-8 flex flex-col space-y-5">
          <div className='flex justify-between'>
            <h2 className="text-xl font-bold mb-4 text-left">Generated Email Content:</h2>
            <Button
              onClick={copyToClipboard}
              variant="contained"
              color="primary"
              startIcon={<ContentCopyIcon />}
              className=""
            >
              Copy Content
            </Button>
          </div>
          <div className="bg-opacity-80 bg-black text-white p-4 rounded-lg font-bold min-h-fit" style={{ whiteSpace: 'pre-line' }}>
            <p>{generatedContent}</p> 
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default EmailTemplateCreator;
