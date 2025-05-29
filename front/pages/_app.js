import React, { Component } from "react";
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import Head from 'next/head';

const Ssdam = ({Component}) =>{
  return(<>
    <Head>
      <meta charset="utf-8"/>
      <title>Ssdam</title>
    </Head>
    <Component />
  </>);
};


Ssdam.protoType = {
  Component : PropTypes.elementType.isRequired

}

export default Ssdam;
