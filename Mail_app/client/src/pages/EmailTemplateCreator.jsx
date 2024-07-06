import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EmailEditor from 'react-email-editor';
import axios from 'axios';

const EmailTemplateCreator = () => {
  const location = useLocation();
  const { from, to, subject, campaignName } = location.state || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    if (editorInstance) {
      setEditorLoaded(true);
    }
  }, [editorInstance]);

  const handleEditorLoad = (editor) => {
    setEditorInstance(editor);
    if (editorLoaded) {
      editor.loadDesign({
        body: {
          rows: [
            {
              columns: [
                {
                  contents: [
                    {
                      type: 'text',
                      values: {
                        text: `<h1>${campaignName}</h1><p>From: ${from}</p><p>To: ${to}</p><p>Subject: ${subject}</p>`,},}, ],},], },],}, });} };

  const onSave = () => {
    if (editorLoaded && editorInstance && editorInstance.exportHtml) {
      editorInstance.exportHtml((data) => {
        const { design, html } = data;
        console.log('Design JSON:', design);
        console.log('HTML:', html);
        axios.post('http://localhost:8000/api/temp-email', {
          design: html,
          subject: campaignName, 
          recipients: to.split(',').map(email => email.trim())
        })
        .then(response => {
          console.log('Email sent successfully', response);
          alert("Email sent successfully")
        })
        .catch(error => {
          console.error('Error sending email', error);
          alert("Error sending email")
        });
      });
    } else {
      console.error('Email editor is not working.');
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-4xl p-4'>Email Template</h1>
      <EmailEditor onLoad={handleEditorLoad} />
      <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-4">
        Save Template and Send Email
      </button>
    </div>
  );
};

export default EmailTemplateCreator;
