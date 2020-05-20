import React, { Component } from 'react'

export default class ModLogarit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputA4 : '',
            inputB4 : '',
            inputC4 : '',
            result4 : ''
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

    recursiveModCalculator = (x,y,z) => {
        var p = null;
        var q = parseInt(y/2);
        if (y===0)
            return 1;
        else {
            p=parseInt(this.recursiveModCalculator(x,q,z));
            if (y%2===0) 
                return (p*p)%z;
            else
                return (p*p*x)%z;
        }
    }

    onSubmit = event => {
        event.preventDefault();
        let {inputA4, inputB4, inputC4} = this.state;
        let A4 = parseInt(inputA4);
        let B4 = parseInt(inputB4);
        let C4 = parseInt(inputC4);
        let result4 = null;
        let arrCheck4 = [];
        let stateResult4 = null;
        let check4 = this.recursiveModCalculator(B4,1,C4);
        for(let i=0;i<C4;i++){
            if(this.recursiveModCalculator(A4,i,C4)===check4)
                arrCheck4.push(i);
        }
        result4 = arrCheck4[0];
        if(!inputA4 || !inputB4 || !inputC4){
            stateResult4 = 'Lỗi ! Chưa nhập đủ số';
        }
        else if(A4===0 && B4===0){
            stateResult4 = 'Lỗi ! Không tồn tại log₀ 0';
        }
        else if(C4===0){
            stateResult4 = 'Lỗi ! Số C phải khác 0';
        }
        else if(result4){
            stateResult4 = result4;
        }
        else if(result4 === null || result4===0){
            stateResult4 = 'Không tồn tại kết quả';
        }
        this.setState({
            result4: stateResult4
        })
    }

    render() {
        let {result4} = this.state;
        return (
            <div className="mod-logarit col-sm-5 text-center">
            <h3 className="mt-5 mb-5">Tính  logₐ b mod c  =  ?</h3>
            <form onSubmit={this.onSubmit} id="form4">
                <div className="row">
                <div className="form-group col-sm-4">
                    <input type="number" className="form-control" placeholder="Nhập a" name="inputA4" onChange={this.onInputChange} />
                </div>
                <div className="form-group col-sm-4">
                    <input type="number" className="form-control" placeholder="Nhập b" name="inputB4" onChange={this.onInputChange} />
                </div>
                <div className="form-group col-sm-4">
                    <input type="number" className="form-control" placeholder="Nhập c" name="inputC4" onChange={this.onInputChange}/>
                </div>
                <button type="submit" className="btn btn-primary col-sm-3 mt-5 mb-5 button1">XEM KẾT QUẢ</button>
                <h4 className="mb-2 col-sm-12 result">{result4}</h4>
                </div>
            </form>
            </div>
        )
    }
}
