import React, { Component } from 'react'

export default class ModInverse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputA2 : '',
            inputB2 : '',
            result2 : ''
        };
    }

    onInputChange = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
          [name] : value
        });
    }

    onSubmit = event => {
        event.preventDefault();
        let {inputA2, inputB2} = this.state;
        let A2 = parseInt(inputA2);
        let B2 = parseInt(inputB2);
        let result2 = '';
        if(!inputA2 || !inputB2){
            result2 = 'Lỗi ! Chưa nhập đủ số';
        }
        else if(A2===0 && B2===0){
            result2 = 'Lỗi ! A và B phải khác 0';
        }
        else {
            for(var i=1;i<B2;i++){
                if((A2*i-1)%B2 === 0)
                    result2 = i;
            }
        }
        this.setState({
            result2
        });
    }

    render() {
        let {result2} = this.state;
        return (
            
            <div className="mod-inverse col-sm-5 text-center">
                <h3 className="mt-5 mb-5">Tìm modulo nghịch đảo theo công thức <br /> A^(-1) mod B</h3>
                <form onSubmit={this.onSubmit} id="form2">
                    <div className="row">
                    <div className="form-group col-sm-6">
                        <input type="number" className="form-control" placeholder="Nhập A" name="inputA2" onChange={this.onInputChange} />
                    </div>
                    <div className="form-group col-sm-6">
                        <input type="number" className="form-control" placeholder="Nhập B" name="inputB2" onChange={this.onInputChange}  />
                    </div>
                    <button type="submit" className="btn btn-primary col-sm-3 mt-5 mb-5 button1">XEM KẾT QUẢ</button>
                    <h4 className="mb-2 col-sm-12 result">{result2}</h4>
                    </div>
                </form>
            </div>
        )
    }
}
