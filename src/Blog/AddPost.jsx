import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { Link, useHistory } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import MenuItem from "@material-ui/core/MenuItem";
import { Editor } from '@tinymce/tinymce-react';
import ImageUploading from 'react-images-uploading';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {

    top: "40px",
    marginBottom: "100px",
    right: "80px",
    height: "auto",
    width: "100%",
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

function AddPost(props) {
  const classes = useStyles();
  const [blog, setBlog] = useState(props.blog);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogText, setBlogText] = useState("");
  const [blogSummary, setblogSummary] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [author, setAuthor] = useState("");
  const [postedOn, setPostedOn] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const editorRef = useRef(null);
  const editorSummaryRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log("editor", editorRef.current.getContent());
      console.log("editor", editorSummaryRef.current.getContent());
      setBlogText(editorRef.current.getContent())
      setblogSummary(editorSummaryRef.current.getContent())
    }
  };

  const submit = (e) => {

    e.preventDefault();

    axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addBlog", {

      blogTitle,
      blogText,
      blogImage,
      blogSummary,
      blogCategory,
      author,
      postedOn,
      slug: 'NULL'
    })
      .then((response) => {
        console.log(response)
        //  history.push("/blog")
      })
    // fetch(
    //   "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addBlog",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       blogTitle,
    //       blogText,
    //       blogImage,
    //       blogSummary,
    //       blogCategory,
    //       author,
    //       postedOn,
    //       slug: 'NULL'

    //       // postedOn,
    //     }),
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
  };

  const handleChange = (event) => {
    setBlogCategory(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', width: '60%', marginLeft: '20%', marginTop: '5%' }} >
      <div className="addpost" id="addpost">
        <h1
          style={{
            textAlign: "center",
            fontFamily: "DidoteTextW01-Italic",
            fontStyle: "italic",
            fontSize: "4.5rem",
            wordWrap: "break-word",
            color: "#d3a625",
          }}
        >
          Create a Blog
        </h1>
        <div className={classes.container} style={{ width: '100%' }}>
          <div className="col-md-5" >
            <div className="form-area">
              <form role="form" onSubmit={submit}>
                <div style={{ display: 'flex' }}>


                  <div style={{ textAlign: 'left', flex: '1', display: 'flex', flexDirection: 'column' }} className={classes.root}>
                    <div>
                    </div>
                    <div className="App">
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          // write your building UI
                          <div className="upload__image-wrapper">
                            <button
                              style={isDragging ? { color: 'red' } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Click or Drop here
                            </button>
                            &nbsp;
                            <button onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.map((image, index) => (
                              setBlogImage(image['data_url']),
                              <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                  <button onClick={() => onImageUpdate(index)}>Update</button>
                                  <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ImageUploading>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <InputLabel id="demo-simple-select-label">
                        Blog Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="Blog Category"
                        value={blogCategory}
                        onChange={handleChange}
                      // onClick={log}
                      >
                        <MenuItem value={"Healty Tips"}>Healthy Tips</MenuItem>
                        <MenuItem value={"Recipes"}>Recipes</MenuItem>
                        <MenuItem value={"Living Well"}>Living Well</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div style={{ flex: '2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <TextField
                        id="postedOn"
                        label="Posted On"
                        value={postedOn}
                        style={{ margin: 8 }}
                        type="date"
                        defaultValue="2021-04-22"
                        helperText="Write today's date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setPostedOn(e.target.value)}
                      />
                      <TextField
                        label="Author"
                        id="author"
                        value={author}
                        placeholder="Author Name"
                        style={{ margin: 8 }}
                        className={classes.textField}
                        helperText="Enter your AuthorID"
                        onChange={(e) => setAuthor(e.target.value)}
                      />

                    </div>
                    <div>
                      <TextField
                        id="blogTitle"
                        value={blogTitle}
                        style={{ margin: 8, }}
                        placeholder="Title"
                        helperText="Enter Blog Title Here"
                        fullWidth
                        multiline
                        rows={2}
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setBlogTitle(e.target.value)}
                      />
                    </div>
                    <div >
                      <Editor
                        onInit={(evt, editor) => editorSummaryRef.current = editor}
                        apiKey='adc5ek8m7a2vvtebcvzm881l62jkqx3qpcvp6do4lbhtp20q'
                        initialValue="<p>Write an abstract</p>"
                        onChange={log}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
                      {/* <button onClick={log}>Log editor content</button> */}
                    </div>
                    <div>

                    </div>
                  </div>
                </div>


                <div style={{ marginTop: '2rem' }}>
                  <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    apiKey='adc5ek8m7a2vvtebcvzm881l62jkqx3qpcvp6do4lbhtp20q'
                    initialValue="<p>Write complete blog here</p>"
                    onChange={log}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />
                  {/* <button onClick={log}>Log editor content</button> */}
                </div>


                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                  <Button
                    //className={classes.btn}
                    style={{ borderRadius: '24px' }}
                    variant="outlined"
                    component="span"
                    type="button"
                    id="submit"
                    name="submit"
                  >
                    Cancel
                  </Button>

                  <Button
                    className={classes.btn}
                    style={{ marginLeft: '2rem', borderRadius: '24px' }}
                    variant="contained"
                    component="span"
                    type="button"
                    id="submit"
                    name="submit"
                    onClick={submit}
                  >
                    Publish Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
