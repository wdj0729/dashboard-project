import React, { Component } from 'react';

class Posts extends Component {
    /* 컴포넌트 생성시 */
    /* 생명주기순서 : constructor(생성자) -> componentWillMount -> render */
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        fetch('http://localhost:5000/seoul')
            .then(res => res.json())
            .then(data => console.log(data));
    }
    render() {
        return (
            <div>
                Posts.js를 App.js에 보이도록 이동
            </div>
        );
    }
}
export default Posts;