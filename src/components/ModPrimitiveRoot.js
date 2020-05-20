import React, { Component } from 'react'

export default class ModPrimitiveRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputA3: '',
      result4: []
    };
  }


  onInputChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
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

  phi = n => {
    let res = n;
    for (let i = 2; i * i <= n; ++i) {
      if (n % i === 0) {
        while (n % i === 0) {
          n /= i;
        }
        res -= res / i;
      }
    }
    if (n !== 1) {
      res -= res / n;
    }
    return res;
  }

  gcd = (a, b) => {
    if (a === 0 || b === 0) {
      return a + b;
    }
    while (a !== b) {
      if (a > b) a = a - b;
      else b = b - a;
    }
    return a;
  }

  primeNumber = n => {
    if (n < 2) {
      return false;
    }
    else {
      for (let i = 2; i < n - 1; i++) {
        if (n % i === 0) {
          return false;
        }
      }
    }
    return true;
  }

  onSubmit = event => {
    event.preventDefault();
    let { inputA3 } = this.state;
    let A3 = parseInt(inputA3);
    let result3 = [];
    let result4 = [];
    let m = this.phi(A3); // phi(n)
    let arrCheck = [];
    let stateResult3 = [];

    for (let i = 2; i < A3; i++) { // tìm a
      if (this.recursiveModCalculator(i, m, A3) === 1)
        arrCheck.push(i);
    }
    for (let k = 0; k < arrCheck.length; k++) {
      for (let j = 1; j < m; j++) {// check từ 1 -> m
        if (this.recursiveModCalculator(arrCheck[k], j, A3) === 1)
          stateResult3.push(arrCheck[k]);
      }
    }
    let stateResult4 = stateResult3.filter((item, index) => stateResult3.indexOf(item) === index);
    for (let p = 0; p < arrCheck.length; p++) {
      if (stateResult4.indexOf(arrCheck[p]) === -1) {
        result3.push(arrCheck[p]);
      }
    }
    for (let q = 0; q < result3.length; q++) {
      if (this.gcd(result3[q], A3) === 1) {
        result4.push(result3[q]);
      }
    }
    result4 = result4.toString();
    if (!inputA3) {
      stateResult3 = 'Lỗi ! Chưa nhập số';
    }
    else {
      if (result4) {
        this.setState({
          result4
        })
      }
      else {
        this.setState({
          result4: `Không tồn tại.`
        });
      }
    }
  }

  render() {
    let { result4 } = this.state;
    return (
      <div className="mod-primitive-root col-sm-5 text-center">
        <h3 className="mt-5 mb-5">Kiểm tra <br /> Căn nguyên thủy của số A</h3>
        <form onSubmit={this.onSubmit} id="form3">
          <div className="row">
            <div className="form-group col-sm-6 form3-div">
              <input type="number" className="form-control" placeholder="Nhập A" name="inputA3" onChange={this.onInputChange} />
            </div>
            <button type="submit" className="btn btn-primary col-sm-3 mt-5 mb-5 button1">XEM KẾT QUẢ</button>
            <h4 className="mb-2 col-sm-12 result">{result4}</h4>
          </div>
        </form>
      </div>
    )
  }
}
