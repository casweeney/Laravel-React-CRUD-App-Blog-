import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Add extends Component {

    constructor() {
        super();
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            category_name:'',
            alert_message:''
        }
    }

    onChangeCategoryName(e) {
        this.setState({
            category_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const category = {
            category_name : this.state.category_name
        }

        axios.post('http://localhost:8000/api/category/store',category)
        .then(res=>{
            this.setState({
                alert_message:"success"
            })
        }).catch(error=>{
            this.setState({
                alert_message:"error"
            })
        });
    }

    render() {
        return (
            <div>
                

                <form onSubmit={this.onSubmit}><hr />
                {this.state.alert_message=="success"?<SuccessAlert message={"Category added successfully."} />:null}
                {this.state.alert_message=="error"?<ErrorAlert message={"An error occured while adding category."} />:null}
                    <div className="form-group">
                        <label htmlFor="category_name">Category Name</label>
                        <input type="text" 
                            className="form-control" 
                            id="category_name" 
                            value={this.state.category_name} 
                            onChange={this.onChangeCategoryName}
                            aria-describedby="emailHelp" 
                            placeholder="Enter Category" 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}


