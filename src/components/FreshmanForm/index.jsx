import React, { Fragment } from 'react'
import {Table, Icon, Button, Tooltip } from 'antd';
import './style.css'

const { Column } = Table;

const FreshmanForm = (props) => {
  return (
    <Table
      bordered={true}
      dataSource={props.dataSource}
      rowKey='intro'
    >
      <Column title='姓名' dataIndex='name' key='name' width='5%'/>
      <Column title='性别' dataIndex='gender' key='gender' width='5%'/>
      <Column title='组别' dataIndex='group' key='group' width='6%'/>
      <Column title='自我介绍' dataIndex='intro' key='intro' width='59%'/>
      <Column title='操作' width='25%' render={(text, record, index)=>
        <Fragment>
          <Tooltip placement='top' title='Click me if you like'>
            <Button type='default'>
              <Icon type="heart" theme="filled" style={{color: 'rgb(217, 61,16)'}}/>
              <span>{record.likes}</span>
            </Button>
          </Tooltip>
          <Tooltip placement='top' title='Click me if you like'>
            <Button type='primary'>
              <Icon type="fire" theme="filled" />
              <span>添加待发送</span>
            </Button>
          </Tooltip>
        </Fragment>
      }/>
    </Table>
  )
}

export default FreshmanForm
