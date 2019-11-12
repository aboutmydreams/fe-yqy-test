import React, { useState, Fragment, useEffect } from "react";
import { Table, Tag, Menu, Icon, Button } from "antd";
import { get } from "../../../request/http";
import "./style.css";
import EditInterface from "./EditInterface";
import AuditModal from "./AuditModal";
import DelUserModal from "./DelUserModal";
const token = localStorage.getItem("token");

const AdmissionUI = () => {
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
              icon="audit"
              onClick={() => {
                setAuditModalVisible(true);
                setAuditRole(text);
              }}
            >
              审核
            </Button>
            <Button
              type="primary"
              icon="edit"
              onClick={() => {
                seEditPageVisible(true);
                setEditType("edit");
                setCurrentEditKey(text.key);
              }}
            >
              编辑
            </Button>
            {/* FIXME:  这个接口的username得和phone绑定 */}
            <DelUserModal phone={text.username} info={text} />
          </Fragment>
        );
      }
    }
  ];
  useEffect(() => {
    (async () => {
      const res = await get(`/attest/attest?token=${token}`);
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
        mode="horizontal"
      >
        <Menu.Item key="user0">
          <Icon type="user" />
          User
        </Menu.Item>
        <Menu.Item key="vip1">
          <Icon type="appstore" />
          Vip1
        </Menu.Item>
        <Menu.Item key="vip2">
          <Icon type="appstore" />
          Vip2
        </Menu.Item>
        <Menu.Item key="vip3">
          <Icon type="appstore" />
          Vip3
        </Menu.Item>
      </Menu>
      {/* 不确定这个是不是必要的，防止同时渲染每行对应的审核框应该能减少性能开销吧 */}
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
            type="primary"
            icon="user-add"
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
            pagination="bottom"
          ></Table>
        </>
      )}
    </>
  );
};

export default AdmissionUI;
