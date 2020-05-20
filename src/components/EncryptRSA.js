import React, { Component } from 'react';

// mã hóa RSA
// đầu vào p,q là số nguyên tố
// n = p*q
// chọn e thỏa mãn: gcd (euler(n), e) = 1
// d là nghịch đảo của e theo mod euler(n)
// Khóa công khai PU = {e, n}
// Khóa riêng PR = {d, n}
// đầu vào bản rõ M < n
// đầu ra bản mã C = M^e mod n
// Giải mã: M = C^d mod n = bản rõ M đầu vào

export default class EncryptRSA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputP5 : '',
            inputQ5 : '',
            inputM5 : '',
            result5 : ''
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

    onInputChange = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
          [name] : value
        });
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
        let {inputP5, inputQ5, inputM5} = this.state;
        let p = parseInt(inputP5);
        let q = parseInt(inputQ5);
        let M = parseInt(inputM5);
        let h4Result5 = document.getElementById("result5");
        if(!inputP5 || !inputQ5 || !inputM5){
            h4Result5.innerHTML = 'Lỗi ! Chưa nhập đủ số';
        }
        else if(this.primeNumber(q)===false){
            h4Result5.innerHTML = 'Lỗi ! q không phải là số nguyên tố';
        }
        else if(this.primeNumber(p)===false){
            h4Result5.innerHTML = 'Lỗi ! p không phải là số nguyên tố';
        }
        else if(M>p*q || M===p*q){
            h4Result5.innerHTML = 'Lỗi ! M phải nhỏ hơn p*q';
        }
        else {
            let n = p*q;
            let eulerN = (p-1)*(q-1);
            let arrGCD = [];
            let e = null;
            let d = null;
            let C = null;
            let M2 = null;
            for(let i=1;i<eulerN;i++){
                if(i!==1 && this.gcd(eulerN,i) === 1)
                arrGCD.push(i);
            }
            if(arrGCD[2])
                e = arrGCD[1];
            else e = arrGCD[0];
            d = this.modInverse(e,eulerN);
            C = this.recursiveModCalculator(M,e,n);
            M2 = this.recursiveModCalculator(C,d,n);
            h4Result5.innerHTML = `<span style="color:green;">Sinh khóa <br>n = p*q = ${n} <br>Φ(n) = ${eulerN} <br> Chọn e NTCN với Φ(n) = ${e} <br>
                    d ≡ e^-1(mod Φ(n)) = ${d} <br>PU = {e,n} = {${e},${n}} <br>PR = {d,n} = {${d},${n}}<br>
                    Bản mã C = M^e mod n = ${C} </span> <br> Giải mã <br> M = C^d mod n = ${M2}`;
        
        }
    }

    render() {
        let {result5} = this.state;
        return (
            <div className="encrypt-RSA col-sm-5 text-center">
            <h3 className="mt-5 mb-5">Mã công khai RSA</h3>
            <form onSubmit={this.onSubmit} id="form5">
                <div className="row">
                <div className="form-group col-sm-6">
                    <input type="number" className="form-control" placeholder="Nhập p" name="inputP5" onChange={this.onInputChange} />
                    <label htmlFor="input-encryptRSA-A5">(p là số nguyên tố)</label>
                </div>
                <div className="form-group col-sm-6">
                    <input type="number" className="form-control" placeholder="Nhập q" name="inputQ5" onChange={this.onInputChange} />
                    <label htmlFor="input-encryptRSA-A5">(q là số nguyên tố)</label>
                </div>
                <div className="row col-sm-12">
                    <div className="form-group col-sm-6 mg-center">
                    <input type="number" className="form-control" placeholder="Nhập bản rõ M" name="inputM5" onChange={this.onInputChange} />
                    <label htmlFor="input-encryptRSA-A5">(M &lt; p*q)</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary col-sm-3 mt-5 mb-5 button1">XEM KẾT QUẢ</button>
                <h4 className="mb-2 col-sm-12 result" id="result5">{result5}</h4>
                </div>
            </form>
            </div>

        )
    }
}
