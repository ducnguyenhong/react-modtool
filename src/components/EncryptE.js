import React, { Component } from 'react'

// Mật mã Elgaman
  // đầu vào q là số nguyên tố
  // a là căn nguyên thủy của q
  // đầu vào khóa riêng xA < q - 1
  // đầu vào bản gốc M < q
  // đầu vào k < q, k ngẫu nhiên
  // yA = a^xA mod q
  // đầu ra Khóa công khai: PU = {q, a, yA}
  // C1= a^k mod q
  // K = yA^k mod q
  // C2 = KM mod q
  // đầu ra Bản mã (C1, C2)
  // giải mã
  // K = C1^xA mod q
  // M = (C2 * K^-1) mod q

export default class EncryptE extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputQ7 : '',
        inputA7 : '',
        inputXA7 : '',
        inputK7 : '',
        inputM7 : '',
        result7 : ''
    };
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

primeNumber = n => {
    if (n < 2){
        return false;
    }
    else{
        for(let i=2;i<n-1;i++){
            if (n%i === 0){
                return false;
            }    
        }
    }
    return true;
}

onInputChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] : value
    });
}

modPrimitiveRoot = (A3,B3) => {
  let m = this.phi(A3); // phi(n)
  if(this.gcd(A3,B3)===1){
      for(let j=1; j<m; j++){// check từ 1 -> m
          if(this.recursiveModCalculator(A3,j,B3) === 1)
              return false;
      }
  }
  return true;
}

phi = n => {
  let res = n;
  for (let i=2; i*i<=n; ++i) {
      if(n%i === 0) {
          while(n%i === 0) {
              n /= i;
          }
          res -= res/i;
      }
  }
  if (n !== 1) {
      res -= res/n;
  }
  return res;
}

gcd = (a,b) => {
  if (a === 0 || b === 0){
      return a + b;
  }
  while(a!==b){
      if(a>b) a = a-b;
      else b = b-a;
  }
  return a;
}

modInverse = (A2,B2) => {
  let Result = null;
  for(var i=1;i<B2;i++){
      if((A2*i-1)%B2 === 0)
          Result = i;
  }
  if(Result !== null) return Result;
}

onSubmit = event => {
    event.preventDefault();
    let {inputQ7, inputA7, inputXA7, inputK7, inputM7} = this.state;
    let q = parseInt(inputQ7);
    let a = parseInt(inputA7);
    let xA = parseInt(inputXA7);
    let k = parseInt(inputK7);
    let M = parseInt(inputM7);
    let h4Result7 = document.getElementById("result7");
    if(!inputQ7 || !inputA7 || !inputXA7 || !inputK7 || !inputM7){
      h4Result7.innerHTML = 'Lỗi ! Chưa nhập đủ số';
    }
    else if(this.primeNumber(q)===false){
      h4Result7.innerHTML = 'Lỗi ! q không phải là số nguyên tố';
    }
    else if(this.modPrimitiveRoot(a,q) === false){
      h4Result7.innerHTML = `Lỗi ! a không phải là căn nguyên thủy của q <br> Hãy sử dụng chức năng Căn nguyên thủy tại Menu`;
    }
    else if(xA > q - 1){
      h4Result7.innerHTML = `Lỗi ! Xᴀ phải nhỏ hơn q-1`;
    }
    else if(M === q || M > q){
      h4Result7.innerHTML = `Lỗi ! M phải nhỏ hơn q`;
    }
    else if(k === q || k > q){
      h4Result7.innerHTML = `Lỗi ! - k phải nhỏ hơn q`;
    }
    else{
      let yA = this.recursiveModCalculator(a,xA,q);
      let K1 = this.recursiveModCalculator(yA,k,q);
      let C1 = this.recursiveModCalculator(a,k,q);
      let KM = K1*M;
      let C2 = this.recursiveModCalculator(KM,1,q);
      let K2 = this.recursiveModCalculator(C1,xA,q);
      let inverseK = this.modInverse(K1,q);
      let C2inverseK = C2 * inverseK;
      let M2 = this.recursiveModCalculator(C2inverseK,1,q);
      h4Result7.innerHTML = `<span style="color:green;">Sinh khóa: <br>Yᴀ = a^Xᴀ mod q = ${yA} <br> K = Yᴀ^k mod q = ${K1} <br>PU = {q, a, Yᴀ} = {${q},${a},${yA}} <br> 
      C₁ = a^k mod q = ${C1}<br> C₂ = K * M mod q = ${C2} <br> Bản mã (C₁,C₂) = (${C1},${C2}) <br></span>
      Giải mã: <br>Khóa bí mật K = C₁^Xᴀ mod q = ${K2} <br>Bản rõ: M = (C₂ * K^(-1)) mod q = ${M2}`;
    }
}


render() {
  let {result7} = this.state;
    return (
        <div className="encrypt-E col-sm-5 text-center">
        <h3 className="mt-5 mb-5">Mật mã Elgaman</h3>
        <form onSubmit={this.onSubmit} id="form7">
          <div className="row">
            <div className="form-group col-sm-6">
              <input type="number" className="form-control A5" placeholder="Nhập q" name="inputQ7" onChange={this.onInputChange} />
              <label htmlFor="input-encryptRSA-A5">(q là số nguyên tố)</label>
            </div>
            <div className="form-group col-sm-6">
              <input type="number" className="form-control B5" placeholder="Nhập a" name="inputA7" onChange={this.onInputChange} />
              <label htmlFor="input-encryptRSA-A5">(a là căn nguyên thủy của q)</label>
            </div>
            <div className="form-group col-sm-6">
              <input type="number" className="form-control A5" placeholder="Nhập khóa riêng Xᴀ" name="inputXA7" onChange={this.onInputChange} />
              <label htmlFor="input-encryptRSA-A5">(Xᴀ &lt; q-1)</label>
            </div>
            <div className="form-group col-sm-6">
              <input type="number" className="form-control B5" placeholder="Nhập k ngẫu nhiên" name="inputK7" onChange={this.onInputChange} />
              <label htmlFor="input-encryptRSA-A5">(k &lt; q)</label>
            </div>
            <div className="row col-sm-12">
              <div className="form-group col-sm-6 mg-center">
                <input type="number" className="form-control A5" placeholder="Nhập bản gốc M" name="inputM7" onChange={this.onInputChange} />
                <label htmlFor="input-encryptRSA-A5">(M &lt; q)</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary col-sm-3 mt-5 mb-5 button1">XEM KẾT QUẢ</button>
            <h4 className="mb-2 col-sm-12 result" id="result7">{result7}</h4>
          </div>
        </form>
      </div>

    )
  }
}
