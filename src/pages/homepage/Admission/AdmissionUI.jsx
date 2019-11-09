import React, { useState, Fragment, useEffect } from "react";
import { Table, Tag, Menu, Icon, Button } from "antd";
import { get } from "../../../request/http";
import "./style.css";
import EditInterface from "./EditInterface";
import AuditModal from "./AuditModal";
import DelUserModal from "./DelUserModal";

const AdmissionUI = () => {
  const token = localStorage.getItem("token");
  const [editType, setEditType] = useState("edit");
  const [editModalVisible, seEditPageVisible] = useState(false);
  const [totalList, setTotalList] = useState([]);
  const [listData, setListData] = useState([]);
  const [currentEditKey, setCurrentEditKey] = useState({});
  const [auditModalVisible, setAuditModalVisible] = useState(false);
  const [auditRole, setAuditRole] = useState("");
  const columns = [
    {
      title: "姓名",
      dataIndex: "true_name",
      key: "true_name",
      render: text => <p>{text}</p>
    },
    {
      title: "公司名称",
      key: "company",
      dataIndex: "company",
      render: text => <Tag color={"blue"}>{text}</Tag>
    },
    {
      title: "手机号",
      dataIndex: "username",
      key: "username",
      render: text => <p>{text}</p>
    },
    {
      title: "操作",
      key: "action",
      render: text => {
        return (
          <Fragment>
            <Button
              onClick={() => {
                setAuditModalVisible(true);
                setAuditRole(text);
              }}
            >
              审核
            </Button>
            <Button
              type='primary'
              icon='edit'
              onClick={() => {
                seEditPageVisible(true);
                setEditType("edit");
                setCurrentEditKey(text.key);
              }}
            >
              编辑
            </Button>
            <DelUserModal phone={text.username} />
          </Fragment>
        );
      }
    }
  ];
  useEffect(() => {
    (async () => {
      // /user/query接口有问题？ 无法修改vip信息
      const res = await get(`/attest/attest?token=${token}`);
      console.log(res);
      setTotalList(res.data["data"]);
      const user0List = [];
      res.data["data"].forEach(item => {
        if (item.role === "user0") {
          return user0List.push(item);
        }
      });
      setListData(user0List);
    })();
    return () => {};
    //eslint-disable-next-line
  }, []);

  const handleChangeData = ({ key }) => {
    seEditPageVisible(false);
    const currentList = [];
    totalList.forEach(item => {
      if (item.role === key) {
        return currentList.push(item);
      }
    });
    setListData(currentList);
  };
  const toggle = show => {
    setAuditModalVisible(show);
  };
  //TODO: 感觉没有必要使用二级路由，因为并不涉及组件的切换...
  //四个板块用的是同一个组件，只是数据不同
  //TODO: 展示组件与编辑组件的切换，考虑上动画？
  return (
    <>
      <Menu
        onClick={handleChangeData}
        defaultSelectedKeys={["user0"]}
        mode='horizontal'
      >
        <Menu.Item key='user0'>
          <Icon type='user' />
          User
        </Menu.Item>
        <Menu.Item key='vip1'>
          <Icon type='appstore' />
          Vip1
        </Menu.Item>
        <Menu.Item key='vip2'>
          <Icon type='appstore' />
          Vip2
        </Menu.Item>
        <Menu.Item key='vip3'>
          <Icon type='appstore' />
          Vip3
        </Menu.Item>
      </Menu>

      {auditModalVisible ? (
        <AuditModal info={auditRole} visi={true} toggle={toggle} />
      ) : null}

      {editModalVisible ? (
        <EditInterface
          companyKey={currentEditKey}
          type={editType}
          onCancel={() => {
            seEditPageVisible(false);
          }}
        />
      ) : (
        <>
          <Button
            type='primary'
            icon='plus-circle'
            onClick={() => {
              setEditType("add");
              seEditPageVisible(true);
              setCurrentEditKey("");
            }}
          >
            新增
          </Button>
          <Table
            columns={columns}
            dataSource={listData}
            pagination='bottom'
          ></Table>
        </>
      )}
    </>
  );
};

export default AdmissionUI;
