import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { fade } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareOutline from "@material-ui/icons/ShareOutlined";
import SearchIcon from "@material-ui/icons/Search";
import defaultImg from "../Assets/Images/Blog-Default-Img.png";
import { Markup } from 'interweave';
import { ReactComponent as ShareBtn } from "../Assets/Images/ios-share-alt.svg";
import { AuthContext } from "../auth/AuthContext";
import AddIcon from '@material-ui/icons/Add';
import '../Appointment/AppointmentPage.css'
import '../Home/Home.css'
const useStyles = makeStyles((theme) => ({
  blogpage: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    marginBottom:'5%',
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
    color: 'black',
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
    color: "black",
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
  },

  inputInput: {
    padding: "10px",
    boxShadow: "none",
    outline: "none",
    width: "450px",
    borderRadius: "0px",
    border: "none",
    borderBottom: '1px solid black',
    "&::placeholder": {
      color: "#C3A336",
    },
    "@media (max-width: 1430px)": {
      width: "200px",
    },
  },

  card: {
    display: "block",
    boxShadow: "none",
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "30px",
    "@media (max-width: 1100px)": {},
  },
  cardRow: {
    display: 'flex',
    "@media (max-width: 500px)": {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  blogImg: {
    width: "25rem",
    height: "20rem",
    "@media (max-width: 500px)": {
      width: "100%",
      marginLeft: '-30px',
      height: "90%",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    color: "#8d6f19",
    fontSize: "1.2rem",
    paddingBottom: "10px",
    width: "250px",
    "@media (max-width: 570px)": {
      width: "100%",
    },
  },
  desc: {
    paddingLeft: '10%',
    marginLeft: "-50px",
    "@media (max-width: 500px)": {
      textAlign: 'left',
      paddingLeft: '0px',
      marginLeft: '0px'
    },
  },
  title: {
    color: "black",
    fontStyle: "italic",
    fontSize: "2rem",
    lineHeight: "1.6",
  },
  content: {
    fontSize: "1.2rem",
    fontFamily: "SF Pro Display",
    wordWrap: "break-word",
    color: "black",
    lineHeight: "1.4",
    textAlign: "justify",
    paddingBottom: "10px",
  },
}));

function Blogpage(props) {
  const [anchorEl, setanchorEl] = useState(null);
  const classes = useStyles();
  const [data, setData] = useState([]);
  const history = useHistory();
  const Auth = useContext(AuthContext);

  const fetchData = async () => {
    const res = await fetch(
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/truncatedBlog"
    );
    const json = await res.json();
    return json.result;
  };
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
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
    <div className="HomeContainer" >
    <div className={classes.blogpage} id="blogpage">
      <div className="CardTitle" style={{margin:'2rem'}}>
        Blog
      </div>
      <div className={classes.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            textAlign: "center",
            color: "#C3A336",
            fontSize: "31px",
            padding: "10px",

          }}
        >

          <div hidden={Auth.isAuth === false}>
            <AddIcon
              size='lg'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push('/addPost')
              }}
            />
          </div>
        </div>

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
                    style={{ textDecoration: "none" }}
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

        {data.map((post) => (
          <div className="blogPostContainer">
            <div className={classes.card}>
              <div className={classes.cardRow}>
                <div>
                  <div>
                    <img
                      src={
                        post.blogImage !== "NULL" && post.blogImage
                          ? post.blogImage
                          : defaultImg
                      }
                      className={classes.blogImg}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                </div>
                <div className={classes.desc}>
                  <div className={classes.header}>
                    {convertDate(post.postedOn)}

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
                    </Menu>
                  </div>
                  <Link
                    to={`/${post.blog_uid}/fullblog`}
                    style={{ textDecoration: "none" }}
                  >
                    <div>
                      <div className={classes.title}>
                        <div style={{ textAlign: 'left' }}>{post.blogTitle}</div>
                      </div>
                      <div className={classes.content} style={{ marginRight:'5%' }}>
                        <Markup content={post.blogSummary} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Blogpage;
