import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import 'antd/dist/antd.css';

import Notification from "../components/Notification";
import { Button, Modal } from "antd";
import PostCard from "../components/PostCard";
import CommentForm from "../components/CommentForm";

const Main = () => {


  return (
    <AppLayout>
      <>
        <CommentForm />
      </>
    </AppLayout >
  );
}

export default Main;
