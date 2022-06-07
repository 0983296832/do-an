import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className="feedback" style={{ marginBottom: 0 }}>
      <div className="productView-title">
        <h1>Blog Tin Tức</h1>
      </div>
      <div className="feedback-container">
        {[1, 2, 3].map((item, index) => {
          return (
            <div key={index}>
              <PostItem />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;

const PostItem = () => {
  const checkLongContent = (content) => {
    if (content.length > 200) {
      return content.slice(0, 170) + "...";
    } else return content;
  };
  return (
    <Card sx={{ maxWidth: 345, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://gamek.mediacdn.vn/133514250583805952/2022/5/4/dragon-ball-super-broly-1651656822745916569546.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {checkLongContent(
            " This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like"
          )}
          <Link to="" style={{ marginLeft: 7 }}>
            Xem thêm
          </Link>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
