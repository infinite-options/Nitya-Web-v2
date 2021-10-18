import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import "typeface-raleway";
import Blogpage from "./Blogpage";
import ScrollToTop from "./ScrollToTop";
import DocumentMeta from 'react-document-meta';

function Blog() {
  const meta = {
    title: 'Blogs',
    description: 'We address different topics in Ayurveda that may be of interest for those who are curious and interested in exploring Ayurvedic principles, philosophy and treatment practice',
    canonical: 'https://nityaayurveda.com/blog',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,meta,document,html,tags'
      }
    }
  }
  return (
    <>
      <div id="blog" className="page-container ">
        <DocumentMeta {...meta} />
        <div className="content-wrap">
          <ScrollToTop />
          <Blogpage />
        </div>
      </div>
    </>
  );
}

export default Blog;
