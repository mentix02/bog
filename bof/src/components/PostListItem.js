import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import { toDesiredFormat } from "../utils/tmf";

function PostListItem(props) {
  let { CreatedAt } = props;
  CreatedAt = toDesiredFormat(CreatedAt);

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <h3>{props.title}</h3>
        </CardTitle>
        <CardSubtitle>
          <span className="text-secondary">published on {CreatedAt}</span>
          <span className="float-right">
            by <Link to="/">{props.author}</Link>
          </span>
        </CardSubtitle>
        <Button
          tag={Link}
          color="success"
          className="mt-2"
          to={`/post/${props.slug}`}
        >
          view
        </Button>
      </CardBody>
    </Card>
  );
}

PostListItem.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  CreatedAt: PropTypes.string.isRequired,
};

export default PostListItem;
