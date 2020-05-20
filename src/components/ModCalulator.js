import React, { Component } from 'react'

export default class ModCalulator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputA1: '',
      inputB1: '',
      inputC1: '',
      result1: ''
    };
  }

  recursiveModCalculator = (x, y, z) => {
    var p = null;
    var q = parseInt(y / 2);
    if (y === 0)
      return 1;
    else {
      p = parseInt(this.recursiveModCalculator(x, q, z));
      if (y % 2 === 0)
        return (p * p) % z;
      else
        return (p * p * x) % z;
    }
  }

  onInputChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit = event => {
    event.preventDefault();
    let { inputA1, inputB1, inputC1 } = this.state;
    let A1 = parseInt(inputA1);
    let B1 = parseInt(inputB1);
    let C1 = parseInt(inputC1);
    let result1 = '';
    if (!inputA1 || !inputB1 || !inputC1) {
      result1 = 'Lỗi ! Chưa nhập đủ số';
    }
    else if (A1 === 0 && B1 === 0) {
      result1 = 'Lỗi ! Không tồn tại 0 mũ 0';
    }
    else if (C1 === 0) {
      result1 = 'Lỗi ! Số C phải khác 0';
    }
    else {
      result1 = this.recursiveModCalculator(A1, B1, C1)
    }
    this.setState({
      result1
    });
  }

  render() {
    let { result1 } = this.state;
    return (
      <div className="mod-calculator col-sm-5 text-center">
        <h3 className="mt-5 mb-5">Tính  A^B mod C  =  ?</h3>
        <form onSubmit={this.onSubmit} id="form1">
          <div className="row">
            <div className="form-group col-sm-4">
              <input type="number" className="form-control" placeholder="Nhập A" name="inputA1" onChange={this.onInputChange} />
            </div>
            <div className="form-group col-sm-4">
              <input type="number" className="form-control" placeholder="Nhập B" name="inputB1" onChange={this.onInputChange} />
            </div>
            <div className="form-group col-sm-4">
              <input type="number" className="form-control" placeholder="Nhập C" name="inputC1" onChange={this.onInputChange} />
            </div>
            <button type="submit" className="btn btn-primary col-sm-3 mt-5 mb-5 button1">XEM KẾT QUẢ</button>
            <h4 className="mb-2 col-sm-12 result">{result1}</h4>
          </div>
        </form>
      </div>
    )
  }
}
