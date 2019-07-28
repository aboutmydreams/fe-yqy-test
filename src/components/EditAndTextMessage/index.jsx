import React from 'react'
import EditAndTextMessageUI from './EditAndTextMessageUI'

function EditAndTextMessage(
  {
    studentToSendToList, // tudents to send message to
    messageTextValue, // the value of textArea (message)
    onCloseTag, // triggers when u close one student tag
    onTextAreaChange,// triggers when textArea changes
    onButtonClick// triggers when the button is clicked
  }) {
  return(
    <EditAndTextMessageUI
      studentToSendToList={studentToSendToList} // students to send message to
      textAreaValue={messageTextValue} // the value of textArea
      onCloseTag={onCloseTag} // triggers when u close one student tag
      onTextAreaChange={onTextAreaChange} // triggers when textArea changes
      onButtonClick={onButtonClick} // triggers when the button is clicked
    />
  )
}

export default EditAndTextMessage
