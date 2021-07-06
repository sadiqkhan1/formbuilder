import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import Button from './components/button';
import Input from './components/input';
import Textarea from './components/textarea';
import { saveForm } from './slices/form.slice'

const App = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [currentElementProps, setCurrentElementProps] = useState({})
  const [form, setForm] = useState([])
  const state = useSelector(state => state.form)

  console.log(state);

  const handleOnChange = ({ target }) => {
    setCurrentElementProps({ ...currentElementProps, [target.name]: target.value })
  }

  const saveToForm = () => {
    const newForm = form
    newForm.push(currentElementProps)
    setForm([...newForm])
    setCurrentElementProps({})
    setisModalOpen(false)
  }

  const submitForm = () => {
    dispatch(saveForm(form));
    setForm([]);
  }

  return <>
    <Button text="Add Text" onClick={() => { setCurrentElementProps({ type: 'text' }); setisModalOpen(true) }} />
    <Button text="Add Input" onClick={() => { setCurrentElementProps({ type: 'input' }); setisModalOpen(true) }} />
    <Button text="Add Textarea" onClick={() => { setCurrentElementProps({ type: 'textarea' }); setisModalOpen(true) }} />
    <Button text="Add Checkbox" onClick={() => { setCurrentElementProps({ type: 'checkbox' }); setisModalOpen(true) }} />
    <Button text="Add Divider" onClick={() => { setForm([...form, { type: 'divider' }]) }} />
    <Button text="Add File Uploader" onClick={() => { setCurrentElementProps({ type: 'file' }); setisModalOpen(true) }} />
    <Modal
      isOpen={isModalOpen}
    >
      {currentElementProps.type === 'text' ? <div>
        Enter Text
        <Input value={currentElementProps.text} onChange={handleOnChange} name="text" />
      </div> :
        <>
          <div>
            Enter Label of Input
            <Input value={currentElementProps.label} onChange={handleOnChange} name="label" />
          </div>
          {
            ['input', 'textarea'].includes(currentElementProps.type) && <>
              <div>
                Enter Placeholder of Input
                <Input value={currentElementProps.placeholder} onChange={handleOnChange} name="placeholder" />
              </div>
            </>
          }
        </>
      }
      <Button text="Save" onClick={() => saveToForm()} />
      <Button text="Close" onClick={() => setisModalOpen(false)} />
    </Modal>

    <Button text="Save Form" onClick={() => submitForm()} />

    {form.map(({ type, placeholder, label, text }, idx) => {
      switch (type) {
        case 'input':
          return <Input key={idx} placeholder={placeholder} label={label} />
        case 'textarea':
          return <Textarea key={idx} placeholder={placeholder} label={label} />
        case 'checkbox':
          return <Input key={idx} type='checkbox' label={label} />
        case 'text':
          return <p key={idx}>{text}</p>
        case 'divider':
          return <hr />
        case 'file':
          return <Input key={idx} type='file' label={label} />
      }
    })}
  </>
};

export default App;
