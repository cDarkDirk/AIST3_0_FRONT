import React from 'react';
import {
  Button,
  Col,
  Form, FormControl,
  FormGroup, Glyphicon,
  Grid, InputGroup,
  Label,
  ListGroupItem,
  Panel,
  Row,
  Modal,
} from "react-bootstrap";
import Notifications from 'react-notification-system-redux';

class DataTemplatesBuilderPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }
  componentDidMount() {
    this.props.fetchDataTemplates();
  }

  renderTemplateBulder = () => {
    const {
      dataTemplates,
      selectedTemplateIndex,
      onDataTemplatesInputChange,
      templateNameChanged,
      addNewParam,
    } = this.props;

    return (
      <Form>
        <ListGroupItem bsStyle="success" style={{maxHeight: '550px', overflow: 'auto'}}>
          <FormGroup>
            <Panel header={'Template values:'}>
              <Row>
                <Col md={12}>
                  <InputGroup>
                    <InputGroup.Addon>Template name</InputGroup.Addon>
                    <FormControl value={dataTemplates[selectedTemplateIndex].name}
                                 onChange={(event) => templateNameChanged(event.target.value)}
                                 type="text"/>
                  </InputGroup>
                </Col>
              </Row>
              <div className='spacer'/>
              {
                dataTemplates[selectedTemplateIndex].data.map((entry, index) => [
                  <Row>
                    <Col md={6}>
                      <InputGroup>
                        <InputGroup.Addon>Parameter key</InputGroup.Addon>
                        <FormControl value={entry.key}
                                     onChange={(val) => onDataTemplatesInputChange({
                                       name: 'key',
                                       value: val.target.value,
                                       index
                                     })}
                                     type="text"/>
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <InputGroup>
                        <InputGroup.Addon>Parameter value</InputGroup.Addon>
                        <FormControl value={entry.value}
                                     onChange={(val) => onDataTemplatesInputChange({
                                       name: 'value',
                                       value: val.target.value,
                                       index
                                     })}
                                     type="text"/>
                      </InputGroup>
                    </Col>
                  </Row>,
                  <div key={index} className='spacer-xs'/>
                ])
              }
              <Button
                bsStyle="primary"
                onClick={() => addNewParam()}
              >
                <Glyphicon glyph='glyphicon glyphicon-plus'/> Add new parameter...
              </Button>
            </Panel>
          </FormGroup>
        </ListGroupItem>
      </Form>
    )
  };

  renderTemplatesList() {
    const {dataTemplatesNames, dataTemplates, selectedTemplateIndex, onTemplateSelected} = this.props;
    return (dataTemplatesNames.map((template, index) =>
      <ListGroupItem
        onClick={() => onTemplateSelected(index)}
        active={index === selectedTemplateIndex}
        key={index}
      >
        {template}
        &nbsp;
        &nbsp;
        {dataTemplates[index].modified && <Label bsStyle="warning">Modified</Label>}
        {dataTemplates[index].new && <Label bsStyle="primary">New</Label>}
      </ListGroupItem>
    ));
  }

  renderSubmitButton() {
    const {dataTemplates, selectedTemplateIndex, submitTemplate, dataTemplatesNames} = this.props;
    return (
      selectedTemplateIndex !== null
        && (dataTemplates[selectedTemplateIndex].modified
        || dataTemplates[selectedTemplateIndex].new)?
        [<Button
          bsStyle="success"
          bsSize="large"
          className="pull-right"
          onClick={() => {submitTemplate({
            value: dataTemplates[selectedTemplateIndex],
            name: dataTemplatesNames[selectedTemplateIndex],
          })}}
        >
          Submit
        </Button>,
          <div className="clearfix"/>
        ]

  : null
    )
  }

  render() {
    const {addNewTemplate, dataTemplates, selectedTemplateIndex, submitTemplate, dataTemplatesNames} = this.props;
    const submit = (
          [ <Button className="pull-left" onClick={this.handleShow}>
            <Glyphicon glyph='glyphicon glyphicon-question-sign'/>
          </Button>,

            <Button
            bsStyle="success"
            bsSize="large"
            className="pull-right"
            disabled={!(selectedTemplateIndex !== null
              && (dataTemplates[selectedTemplateIndex].modified
                || dataTemplates[selectedTemplateIndex].new))}
            onClick={() => {submitTemplate({
              value: dataTemplates[selectedTemplateIndex],
              name: dataTemplatesNames[selectedTemplateIndex],
            })}}
          >
            Submit
          </Button>,
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title><strong>Конструктор тестов</strong></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Чтобы редактировать тест, необходимо:</p>
                <li type="square">Выбрать тест из списка слева</li>
                <li type="square">Заполнить необходимые параметры теста в форме справа</li>
                <li type="square">После того, как все изменения внесены, необходимо нажать кнопку Submit</li>
                <br/>
                <p>Чтобы создать тест, необходимо:</p>
                <li type="square">Нажать кнопку Add new test</li>
                <li type="square">Заполнить необходимые параметры теста в форме справа</li>
                <li type="square">После того, как все изменения внесены, необходимо нажать кнопку Submit</li>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Закрыть</Button>
              </Modal.Footer>
            </Modal>,
            <div className="clearfix"/>
          ]
    );
    return (
      <div>
        <Panel bsStyle='primary' header={submit}>
          <Grid fluid={true}>
            <Row key={'bla'}>
              <Col md={3}>
                <Button
                  bsStyle="primary"
                  className='btn-block'
                  onClick={() => addNewTemplate()}
                  key={'addNewTemplate'}
                >
                  <Glyphicon glyph='glyphicon glyphicon-plus'/> Add new test...
                </Button>
                {this.renderTemplatesList()}
              </Col>
              <Col md={9}>
                {this.props.selectedTemplateIndex !== null && this.renderTemplateBulder()}
              </Col>
            </Row>
          </Grid>
        </Panel>
        <Notifications notifications={this.props.notifications}/>
      </div>
    )
  }
}

export default DataTemplatesBuilderPage