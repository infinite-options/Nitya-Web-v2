import React, { useState, useEffect } from "react";

import { fade } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareOutline from "@material-ui/icons/ShareOutlined";
import SearchIcon from "@material-ui/icons/Search";
import AuthorIcon from "@material-ui/icons/AccountCircle";
import ReplyIcon from '@material-ui/icons/Reply';
import { useParams } from "react-router";
import ScrollToTop from "./ScrollToTop";
import { Markup } from 'interweave';

const useStyles = makeStyles((theme) => ({
  blogpage: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    backgroundColor: "white",
    marginRight: "200px",
    marginLeft: "200px",
    fontFamily: "Hoefler Text",
    "@media (max-width: 1430px)": {
      marginRight: "100px",
      marginLeft: "100px",
    },
    "@media (max-width: 1100px)": {
      marginRight: "50px",
      marginLeft: "50px",
    },
  },
  appbar: {
    backgroundColor: "white",
    boxShadow: "none",
    padding: "4px",
    "@media (max-width: 880px)": {
      display: "none",
    },
  },
  navbarDisplayFlex: {
    display: "flex",
    marginLeft: 0,
    justifyContent: "space-between",
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "60%",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "capitalize",
    color: "white",
  },
  search: {
    display: "inline-block",
    borderRadius: "15px",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIconDiv: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "10px",
  },
  searchContainer: {
    display: "flex",
    color: 'black'
  },
  inputRoot: {
    color: "#594d2cs",
  },
  inputInput: {
    padding: "10px",
    boxShadow: "none",
    outline: "none",
    width: "450px",
    borderRadius: "0px",
    border: '0px',
    borderBottom: '1px solid black',
    "&::placeholder": {
      color: "black",
    },
    "@media (max-width: 1430px)": {
      width: "200px",
    },
  },

  card: {
    display: "flex",
    boxShadow: "none",
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "30px",
    paddingRight: "30px",
    "@media (max-width: 1100px)": {},
  },
  cardRow: {
    "@media (max-width: 1100px)": {
      display: "none",
    },
  },
  cardMobile: {
    display: "none",
    "@media (max-width: 1100px)": {
      display: "block",
      textAlign: "center",
    },
  },
  blogImg: {
    width: "436px",
    height: "327px",
    "@media (max-width: 570px)": {
      width: "90%",
      height: "90%",
    },
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    color: "#8d6f19",
    fontSize: "20px",
    width: "100%",
    "@media (max-width: 570px)": {
      width: "130%",
      marginLeft: '-2rem',
    },
  },
  desc: {
    marginLeft: "-50px",
  },
  title: {
    color: "#D3A625",
    fontSize: "2rem",
    lineHeight: "1",
  },
  content: {
    fontSize: "1.2rem",
    fontFamily: "SF Pro Display",
    wordWrap: "break-word",
    color: "black",
    lineHeight: "1.4",
    textAlign: "justify",
    paddingTop: "30px",
    paddingBottom: "10px",
    padding: '10%',
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
    boxShadow: "none",
    fontSize: "1.2rem",
    fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "#8d6f19",
  },

  author: {
    display: "flex",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

function FullBlog(props) {
  const [anchorEl, setanchorEl] = useState(null);
  const classes = useStyles();
  const [getBlogId, setBlogId] = useState([]);
  const { blog_uid } = useParams();

  const getDataById = async () => {
    const res = await fetch(
      `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/fullBlog/${blog_uid}`
    );
    const json = await res.json();
    return json.result;
  };
  useEffect(() => {
    getDataById().then((getBlogId) => {
      setBlogId(getBlogId);
    });
  }, []);

  const handleClick = (e) => {
    setanchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    alert("Searched");
  };

  const convertDate = (date) => {
    if (date) {
      const year = date.substring(0, 4);
      let month = date.substring(5, 7);
      const day = date.substring(8, 10);

      switch (month) {
        case "01":
          month = "Jan";
          break;
        case "02":
          month = "Feb";
          break;
        case "03":
          month = "Mar";
          break;
        case "04":
          month = "Apr";
          break;
        case "05":
          month = "May";
          break;
        case "06":
          month = "Jun";
          break;
        case "07":
          month = "Jul";
          break;
        case "08":
          month = "Aug";
          break;
        case "09":
          month = "Sep";
          break;
        case "10":
          month = "Oct";
          break;
        case "11":
          month = "Nov";
          break;
        case "12":
          month = "Dec";
          break;
        default:
          month = date.substring(5, 7);
      }
      return month + " " + day + ", " + year;
    }
    return "";
  };

  const navLinks = [
    { title: `all posts`, path: `/blog` },
    { title: `healthy tips`, path: `/healthy tips` },
    { title: `recipes`, path: `/recipes` },
    { title: `living well`, path: `/living well` },
  ];

  return (
    <div className="page-container ">
      <ScrollToTop />
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Container maxWidth="md" className={classes.navbarDisplayFlex}>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                <a
                  href={path}
                  key={title}
                  className={classes.linkText}
                  style={{ textDecoration: "none", color: 'black' }}
                >
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </a>
              ))}
            </List>
          </Container>
          <div className={classes.searchContainer}>
            <div className={classes.search}>
              <form onSubmit={submitSearch}>
                <input
                  type="text"
                  className={classes.inputInput}
                  placeholder="Search..."
                />
              </form>
            </div>
            <div className={classes.searchIconDiv}>
              <SearchIcon fontSize="small" />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        {getBlogId.map((post) => (
          <div className="blogPostContainer">
            <Card className={classes.card}>
              <div>

                <div style={{ color: 'black', marginLeft: '8%' }} className={classes.header}>
                  <IconButton
                    size="lg"
                    onClick={handleClick}
                    aria-label="click to share post"
                  >
                    <AuthorIcon style={{ marginTop: '-0.7rem' }} />
                  </IconButton>
                  &nbsp; &nbsp;
                  {post.author} &nbsp; &nbsp; <li></li>  {convertDate(post.postedOn)}{" "}

                  <ReplyIcon
                    onClick={handleClick}
                    size="sm"
                    style={{ marginLeft: '1rem', transform: 'scaleX(-1)', color: '#D3A625', marginBottom: '-0.3rem' }}
                    aria-label="click to share post">
                  </ReplyIcon>



                  <Menu
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      style={{
                        color: "#594d2c",
                        width: "200px",
                        height: "50px",
                        padding: "0",
                        fontSize: "1.5rem",
                      }}
                      position="bottom"
                      onClick={handleClose}
                    >
                      <IconButton
                        fontSize="small"
                        aria-label="click to share post"
                      >
                        <ShareOutline />
                      </IconButton>
                      Share Post
                    </MenuItem>
                  </Menu>
                </div>

                <div style={{ textAlign: 'left', fontSize: '52px', color: 'black', marginLeft: '10%' }} className={classes.title}>
                  <p>{post.blogTitle}</p>
                </div>

                {!!post.blogImage && (
                  <div className={classes.img}>
                    <img
                      src={post.blogImage}
                      style={{
                        width: "1000px",
                        height: "600px",
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
                <div className={classes.content}>
                  {/* <div>{post.blogText.replace('</br>', '\n')}</div> */}
                  <p style={{ fontSize: '32px' }}>{post.blogTitle}</p>
                  {/* {
                    post.blogText.split("\n").map(function (item, idx) {
                      return (
                        <span key={idx}>
                          {item}
                          <br />
                        </span>
                      )
                    })
                  } */}

                  <Markup content={post.blogText} />
                </div>

                <hr style={{ color: "#8d6f19" }}></hr>
                <div className={classes.cardActions}>
                  <Typography>Views &nbsp;&nbsp; Comments</Typography>

                  <IconButton className={classes.icon}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FullBlog;
