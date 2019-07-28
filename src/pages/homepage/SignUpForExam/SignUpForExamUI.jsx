import React, { Fragment } from 'react'
import FreshmanForm from '../../../components/FreshmanForm'

const SignUpForExamUI = ({dataSource, SendMessageComponent, studentToSendToList, messageTextValue, onCloseTag, onTextAreaChange, onButtonClick}) => {
  return (
    <Fragment>
      <FreshmanForm dataSource={dataSource}/>
      <SendMessageComponent
        studentToSendToList={studentToSendToList}
        messageTextValue={messageTextValue}
        onCloseTag={onCloseTag}
        onTextAreaChange={onTextAreaChange}
        onButtonClick={onButtonClick}
      />
    </Fragment>
  )
}

export default SignUpForExamUI
