import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './photo.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhotoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PhotoDetail = (props: IPhotoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { photoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Photo [<b>{photoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{photoEntity.title}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{photoEntity.description}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {photoEntity.image ? (
              <div>
                <a onClick={openFile(photoEntity.imageContentType, photoEntity.image)}>
                  <img src={`data:${photoEntity.imageContentType};base64,${photoEntity.image}`} style={{ maxHeight: '30px' }} />
                </a>
                <span>
                  {photoEntity.imageContentType}, {byteSize(photoEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="height">Height</span>
          </dt>
          <dd>{photoEntity.height}</dd>
          <dt>
            <span id="width">Width</span>
          </dt>
          <dd>{photoEntity.width}</dd>
          <dt>
            <span id="taken">Taken</span>
          </dt>
          <dd>
            <TextFormat value={photoEntity.taken} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="uploaded">Uploaded</span>
          </dt>
          <dd>
            <TextFormat value={photoEntity.uploaded} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>Album</dt>
          <dd>{photoEntity.album ? photoEntity.album.title : ''}</dd>
          <dt>Tag</dt>
          <dd>
            {photoEntity.tags
              ? photoEntity.tags.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.name}</a>
                    {i === photoEntity.tags.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/photo" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/photo/${photoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ photo }: IRootState) => ({
  photoEntity: photo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail);
