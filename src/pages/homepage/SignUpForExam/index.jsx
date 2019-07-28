import React, {useState} from 'react'
import SignUpForExamUI from './SignUpForExamUI'
import EditAndSendMessage from '../../../components/EditAndTextMessage'
import { message } from "antd";

const SignUpForExam = () => {
  // student to send message to
  const [studentToSendToList, setStudentToSendToList] = useState(['Bob', 'Frank', 'Sally', 'George', 'Alice', 'Bobbie', 'Cather', 'Carter', 'Dall', 'Dell', 'Emily', 'Eric', 'Helen', 'Irish', 'Jackie', 'Keven', 'Molly', 'Nancy', 'Peter', 'Queenie', 'Rick'])
  // message value
  const [messageTextValue, setMessageTextValue] = useState('hello World')
  // form data
  const [formData] = useState([{
    name: 'Bob',
    gender: '男',
    group: '运营',
    intro: 'Google was founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a privately held company on September 4, 1998. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet\'s leading subsidiary and will continue to be the umbrella company for Alphabet\'s Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet.',
    likes: 100
  },
    {
      name: 'Sally',
      gender: '女',
      group: '设计',
      intro: 'Can I?',
      likes: 23
    },
    {
      name: 'Eric',
      gender: '男',
      group: '产品',
      intro: 'NCUHome is awesome',
      likes: 87
    },{
      name: 'Bob',
      gender: '男',
      group: '研发',
      intro: 'Twitter is an American online microblogging and social networking service on which users post and interact with messages known as "tweets". Tweets were originally restricted to 140 characters, but on November 7, 2017, this limit was doubled to 280 for all languages except Chinese, Japanese, and Korean. ',
      likes: 100
    },
    {
      name: 'Sally',
      gender: '女',
      group: '行政',
      intro: 'Plz let me in',
      likes: 23
    },
    {
      name: 'Eric',
      gender: 'male',
      group: '产品',
      intro: 'NCUHome is great',
      likes: 87
    },{
      name: 'Bob',
      gender: '男',
      group: '研发',
      intro: 'Facebook, Inc. is an American online social media and social networking service company based in Menlo Park, California. It was founded by Mark Zuckerberg, along with fellow Harvard College students and roommates Eduardo Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes.',
      likes: 100
    },
    {
      name: 'Sally',
      gender: '女',
      group: '行政',
      intro: 'I just wanna get in',
      likes: 23
    },
    {
      name: 'Eric',
      gender: '男',
      group: '产品',
      intro: 'NCUHome is amazing',
      likes: 87
    }])

  const onCloseTag = (index) => {
    console.log(index)
    let newStudentToSendToList = Array.from(studentToSendToList)
    newStudentToSendToList.splice(index, 1)
    console.log('new list', newStudentToSendToList)
    setStudentToSendToList(newStudentToSendToList)
  }

  const onTextAreaChange = (e) => {
    setMessageTextValue(e.target.value)
  }

  const onButtonClick = () => {
    message.success('login')
    console.log('TextAreaValue', messageTextValue)
  }

  return (
    <SignUpForExamUI
      dataSource={formData}
      SendMessageComponent={EditAndSendMessage}
      studentToSendToList={studentToSendToList}
      messageTextValue={messageTextValue}
      onCloseTag={onCloseTag}
      onTextAreaChange={onTextAreaChange}
      onButtonClick={onButtonClick}
    />
  )
}

export default SignUpForExam
