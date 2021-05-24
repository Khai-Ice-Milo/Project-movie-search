import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { img_500, unavailable, unavailableLandscape } from "../../config.js/config";
import Carousel from "../Carousel/Carousel";
import "./ContentModal.css";
/*Some import deleted by khai, forgot which one*/

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    /*edited by khai to fit video*/
    width: "90%",
    height: "99%",
    /*edited by khai to fit video ended*/
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=e87731f13becefa826f6e5ce56429440&region=bn`);

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=e87731f13becefa826f6e5ce56429440&region=bn`);

    console.log(data);
    setVideo(data.results[0]?.key);
  };
  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.name || content.title} className="ContentModal__portrait" />
                <img src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} className="ContentModal__landscape" />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} ({(content.first_air_date || content.release_date || "-----").substring(0, 4)})
                  </span>
                  {content.tagline && <i className="tagline">{content.tagline}</i>}

                  <span className="ContentModal__description">{content.overview}</span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>
                 

                 {/*Edited and Added by khai*/}
                  <div className="ContentModal__Video">
                  <iframe className="responsive-iframe" src={`https://www.youtube.com/embed/${video}`}
                    frameborder='0'
                    allow='autoplay; encrypted-media'
                    allow="fullscreen"
                    title='video'
                  />
                  </div>
                  {/*Edited and Added by khai ended*/}
                </div>   
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
