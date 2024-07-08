import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmailEditor from 'react-email-editor';
import sample from './savefile.json';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';

const EmailTemplateCreator = () => {
  const location = useLocation();
  const emailEditorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

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
        alert('Design JSON has been logged in your developer console.');
      });
    } else {
      console.error('Email editor is not ready.');
    }
  };

  const sendEmail = async () => {
    const { from, to, subject, campaignName } = location.state || {};

    if (!from || !to || !subject || !campaignName) {
      console.error('Missing required data (from, to, subject, campaignName)');
      alert('Missing required data (from, to, subject, campaignName)');
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
        alert('Email sent successfully');
      })
      .catch(error => {
        console.error('Error sending email', error);
        alert('Error sending email');
      });
    } catch (error) {
      console.error('Error exporting HTML', error);
      alert('Error exporting HTML');
    }
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
      </div>
    </div>
  );
};

export default EmailTemplateCreator;
