import React,{ Fragment, useState } from 'react'
import { Typography, Tag, Row, Col, Input, Button, Drawer, Badge, Tooltip, Icon } from 'antd';
import './style.css'

const { Text } = Typography;
const { TextArea } = Input;

const EditAndTextMessageUI = ({ onCloseTag, studentToSendToList, textAreaValue, onTextAreaChange, onButtonClick }) => {

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onCloseDrawer = () => {
    setVisible(false)
  }

  return (
    <Fragment>
      <Badge count={23}>
        <Button type='primary' onClick={showDrawer}>Edit Message</Button>
      </Badge>
      <Drawer
        title="编辑短信"
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        width={400}
        visible={visible}
      >

        <div className={'send_target'}>
          <Text style={{fontWeight: 'bold'}}>发送对象</Text>
          <Row>
            <Col span={24}>
              {
                studentToSendToList.map((item, index) => <Tag closable={true} color="blue" onClose={() => {onCloseTag(index)}} key={item}>{item}</Tag>)
              }
            </Col>
          </Row>
        </div>

        <div className={'editing_area'}>
          <Text style={{fontWeight: 'bold'}}>
            编辑短信
            <Tooltip title="What do you want others to call you?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </Text>
          <Row>
            <Col span={24}>
              <TextArea rows={6} placeholder={'Just text whatever u want'} value={textAreaValue} onChange={onTextAreaChange}/>
            </Col>
          </Row>
        </div>

        <div className={'sent_button'}>
          <Button type="primary" icon="check" onClick={onButtonClick} className='comfirm-btn'>
            确认发送
          </Button>
        </div>
      </Drawer>

    </Fragment>
  )
}


export default EditAndTextMessageUI
