import './Note.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewEvent, removeEvent, clearEvent } from '../Redux/Reducer/event';
import $ from 'jquery';

/* 
    this a component of note
    have use hook, reducer and jquery
    it's have 2 hook: title and content mean title of note and content of note
    this have 2 external funcs is
        te: a function for set default value for note if this note was existed in redux
        findEvent: a function support to find position of Event in redux, if it's not existed will return -1

    internal funcs have:
        hideNote: hide note component
        getTitle: func to get and update value of title
        getContent: same getTitle func
        ==> 2 func will get per input value
        clearNote: func to clear all in note, more specific:
            check if it's not in store, clear it and notthing
            if in store: 
                if it's have value, clear value
                if it's not have value, do notthing
        ==> clear store will keep event in store, not delete
        saveNote: it's check condition, save a note to store!
        delNote: it's delete an event in store, if it's not existed, do notthing
    the template return was organization as follows:
        div note-head contain
            a svg is icon to close note
            a input is a title of note
            a span as a button to save it
        div note-body contain
            a text-area as a content of note
            2 button to clear and delete note!

*/

const te = (props, Event) => {
    console.log(props);
    let pos = findEvent(Event, props);

    if (pos !== -1 && Event[pos].time === props.props.toString()) {
        $('.note-title').val(Event[pos].title);
        $('#note-content').val(Event[pos].content);
        console.log(Event[pos]);
    }
    else {
        $('.note-title').val(null);
        $('#note-content').val(null);
    }
    console.log(pos);
}

const findEvent = (Event, props) => {
    let find = -1;
    for (let i = 0; i < Event.length; i++) {
        if (Event[i].time === props.props.toString())
            find = i;
    }
    return find;
}

export const Note = (props) => {
    const Event = useSelector((state) => state);
    const dispatch = useDispatch();


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const hideNote = () => {
        $(".note").hide();
    }

    const getTitle = () => {
        let title = $(".note-title").val();
        setTitle(title);
    }

    const getContent = () => {
        let content = $("#note-content").val();
        setContent(content);
    }

    const clearNote = () => {
        let pos = findEvent(Event, props);
        console.log(pos);
        if (pos === -1) {
            $(".note-title").val('');
            $("#note-content").val('');

            setTitle('');
            setContent('');
            alert("clear!");
        }

        else {
            let action = clearEvent(props.props.toString());
            dispatch(action);
        }
    }

    const saveNote = () => {
        getTitle();
        getContent();
        console.log(title, content);
        if (title !== '' && content !== '') {
            let day = props.props.toString();
            /* console.log(day); */
            let data = {
                time: day,
                title: title,
                content: content
            };

            const action = addNewEvent(data);
            dispatch(action);
        }
        else {
            alert("you must input title and content!");
        }

    }

    const delNote = async () => {
        //let preStateLength = Event.length;
        const action = removeEvent(props.props.toString());
        dispatch(action);
        //console.log(Event);
    }

    te(props, Event);
    return (
        <div className="note">
            {/* {test} */}
            <div className="note-head">
                <span onClick={hideNote}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                    </svg>
                </span>
                <input className="note-title"></input>
                <strong className="note-save" onClick={saveNote}>save it!</strong>
            </div>

            <div className="note-body">
                <textarea id="note-content" rows={21}></textarea>
                <button className='note-remove btn btn-success' onClick={clearNote}>clear</button>
                <button className='note-delete btn btn-danger' onClick={delNote}>delete</button>

            </div>


        </div>
    );
}