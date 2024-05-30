import React from 'react';
import {Form, Button, Accordion, Container, Col, Row, Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {
    addQuestion,
    deleteQuestion,
    updateQuestion,
    setModal,
    setModal2,
    setQuestionIdToDelete,
    setQuestionIdToUpdate
} from "../../store/slices/questionsSlice";

import {useSelector, useDispatch} from "react-redux";

function MainPage() {

    const dispatch = useDispatch();
    const {questions,
        modal,
        modal2,
        questionIdToDelete,
        questionIdToUpdate
    } = useSelector((store) => store.questionsReducer);

    const {
        register,
        handleSubmit,
        reset,
        formState
        } = useForm();


    function submit(values){
        dispatch(addQuestion(values));
        reset()
    }

    function deleteQuestionFn(id){
        dispatch(setQuestionIdToDelete(id));
        dispatch(setModal(true))
    }

    function confirmDelete(){
        dispatch(deleteQuestion(questionIdToDelete))
        dispatch(setModal(false))
    }

    function updateQuestionFn(id, values){
        dispatch(setQuestionIdToUpdate({
            id,
            ...values
        }))
        dispatch(setModal2(true))
    }

    function confirmUpdate(){
        dispatch(updateQuestion(questionIdToUpdate))
        dispatch(setModal2(false))
    }



    return (
        <div>
            <Container>
                <h2 className="mb-3">Создать вопрос</h2>

                <Form onSubmit={handleSubmit(submit)} className="mb-4">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Вопрос</Form.Label>
                        <Form.Control type="text" placeholder="введите вопрос" {...register("title")}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Ответ</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="введите ответ" {...register("answer")}/>
                    </Form.Group>


                    <Button
                        disabled={!formState.isDirty || !formState.isValid}
                        variant="dark"
                        type="submit">
                        Создать вопрос
                    </Button>

                </Form>


                <Accordion defaultActiveKey="0">
    {
        questions.map(((question, index) => (
            <Row key={question.id}>
                <Col lg={8}>
                    <Accordion.Item eventKey={index} >
                        <Accordion.Header>{question.title}</Accordion.Header>
                        <Accordion.Body>
                            {question.answer}
                        </Accordion.Body>
                    </Accordion.Item>
                </Col>

                <Col lg={2}>
                    <Button
                        disabled={!formState.isDirty || !formState.isValid}
                        onClick={() => deleteQuestionFn(question.id)}
                        variant="outline-danger" type="button" className="w-100 h-100">
                        Удалить
                    </Button>
                </Col>

                <Col lg={2}>
                    <Button
                        disabled={!formState.isDirty || !formState.isValid}
                        onClick={handleSubmit((values) =>
                            updateQuestionFn(question.id, values))}
                        variant="outline-success"
                        type="button"
                        className="w-100 h-100">
                        Поменять
                    </Button>
                </Col>
            </Row>
        )))
    }
                </Accordion>
            </Container>


            <Modal show={modal} onHide={() => dispatch(setModal(false))}>
                <Modal.Header closeButton>
                    <Modal.Title>Модальное окно</Modal.Title>
                </Modal.Header>
                <Modal.Body>Уверены, что хотите удалить вопрос?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(setModal(false))}>Нет</Button>
                    <Button variant="primary" onClick={confirmDelete}>Да</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modal2} onHide={() => dispatch(setModal2(false))}>
                <Modal.Header closeButton>
                    <Modal.Title>Модальное окно</Modal.Title>
                </Modal.Header>
                <Modal.Body>Уверены, что хотите изменить вопрос?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(setModal2(false))}>Нет</Button>
                    <Button variant="primary" onClick={confirmUpdate}>Да</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MainPage;