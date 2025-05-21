interface MeetingTranscriptionPromptRequest {
  bookcaseName: string;
  bookshelfName: string;
  name: string;
  meetingDate: Date | null;
  startTime: string;
  location: string;
  agendaItemNames: string[];
  userAttendeeNames: string[];
}

//  TODO:  MAKE IT HANDLE SUBITEMS PROPERLY AS THEIR OWN MINUTES SECTIONS

// Finally, please ensure that the names of the meeting attendees referenced in the minutes correspond to the following list of attendees:
// ${request.agendaAttendees.map((name, index) => `${index + 1}. ${name}`).join('\n')}

const generateMeetingTranscriptionPrompt = (
  request: MeetingTranscriptionPromptRequest,
) =>
  `Dear ChatGPT,

You are tasked with converting a full audio transcription of a meeting into very detailed formal meeting minutes. In cases where the transcript doesn't seem like a meeting, please still produce minutes from the relevant parts of the transcript. Your goal is to create a structured, professional, and highly detailed meeting minutes document.

Please follow these instructions to prepare the final version of the minutes:

1. Preparation of the Minutes

If mentioned, or easy to ascertain, title the first agenda item "Appointment of Chair", and in the minutes simply note who was appointed chair of the meeting, e.g. "[Name] was appointed chair (“Chair”) of the Meeting."

If there is an agenda item called something like "Notice and Quorum" then include an item for this, e.g. "The Chair confirmed that the Secretary had given due notice of the Meeting to all the Directors of the Company, that a quorum of the Directors was in attendance and that the Meeting was duly constituted and convened."

If there are any disclosures of interests or conflicts discussed please clearly document them.

Next, please determine what you can about the context of this meeting based on the fact that the meeting pack and agenda sits within the "${request.bookcaseName}" bookcase and is a "${request.bookshelfName}" meeting titled "${request.name}", and continue preparing the minutes accordingly, corresponding strictly to the following agenda items:
${request.agendaItemNames.join('\n')}

For each agenda item, you must produce formal and very detailed meeting minutes. If any resolutions were passed please state this clearly by saying something like "IT WAS RESOLVED..." with those three words in all caps. Include relevant decisions that were made. If action points were specified please include them along with who they were assigned to. Include anything else that is neccessary for very formal meeting minutes. Where appropriate please organise the minutes for an agenda item into subitems which address the different matters within the agenda item, to make it better organised and easier to read.

If mentioned, please include references to applicable laws or corporate policies discussed during the meeting (for example, the Companies (Jersey) Law, 1991, if relevant).

2. Writing Style:
Use very formal and professional language throughout the document, as this is a legal document.
Ensure it's written in very clear language. Please make sure your minutes are very thorough, detailed and relevant. As a guide aim for at least ${250 + request.agendaItemNames.length * 250} words in total.
Ensure the tone and formatting are consistent with sophisticated corporate governance standards.
Ensure you respond in British English, not American English.

3. Structuring the return data:

Please strictly respond in JSON format and return the finalized meeting minutes in an array structured accordingly:

{
"Produced Meeting Minutes": [
    {
      "AgendaItem": ...,
      "RelatedMinutes": ...,
    },
    {
      "AgendaItem": ...,
      "RelatedMinutes": ...,
    },
  ]
}

Thank you!

Please strictly only derive the meeting minutes from information contained in the transcript. Here's is the transcript:
`;

export default generateMeetingTranscriptionPrompt;
