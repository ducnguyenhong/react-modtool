import React, { Component } from 'react'

// Trao đổi khoá Diffie-Hellman
// đầu vào q là số nguyên tố
// a là căn nguyên thủy của q
// đầu vào khóa riêng xA < q
// đầu vào khóa riêng xB < q
// khóa công khai yA = a^xA mod q
// khóa công khai yB = a^xB mod q
// Alice chọn xA và gửi cho Bob yA
// Bob chọn xB và gửi cho Alice yB
// khi có yA và yB, sẽ tính ra được khóa K bí mật chung
// khóa K = yB^xA mod q = yA^xB mod q

export default class EncryptDH extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputQ6 : '',
            inputA6 : '',
            inputXA6 : '',
            inputXB6 : '',
            result6 : ''
        };
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

    onSubmit = event => {
        event.preventDefault();
        let {inputQ6, inputA6, inputXA6, inputXB6} = this.state;
        let q = parseInt(inputQ6);
        let a = parseInt(inputA6);
        let xA = parseInt(inputXA6);
        let xB = parseInt(inputXB6);
        let h4Result5 = document.getElementById("result6");
        if(!inputQ6 || !inputA6 || !inputXA6 || !inputXB6){
            h4Result5.innerHTML = 'Lỗi ! Chưa nhập đủ số';
        }
        else if(this.primeNumber(q)===false){
            h4Result5.innerHTML = 'Lỗi ! q không phải là số nguyên tố';
        }
        else if(this.modPrimitiveRoot(a,q) === false){
            h4Result5.innerHTML = `Lỗi ! a không phải là căn nguyên thủy của q <br> Hãy sử dụng chức năng Căn nguyên thủy tại Menu`;
        }
        else if(xA === q || xA > q){
            h4Result5.innerHTML = `Lỗi ! Xᴀ phải nhỏ hơn q`;
        }
        else if(xB === q || xB > q){
            h4Result5.innerHTML = `Lỗi ! Xʙ phải nhỏ hơn q`;
        }
        else{
            let yA = this.recursiveModCalculator(a,xA,q);
            let yB = this.recursiveModCalculator(a,xB,q);
            let K = this.recursiveModCalculator(yB,xA,q);
            h4Result5.innerHTML = `<span style="color:green;">Sinh khóa <br> Yᴀ = a^Xᴀ mod q = ${yA} <br>Yʙ = a^Xʙ mod q = ${yB} </span>
            <br>Khóa bí mật K = Yʙ^Xᴀ mod q = Yᴀ^Xʙ mod q = ${K}`
            //console.log(recursiveModCalculator(yA,xB,q));
        }
    }

    render() {
        let {result6} = this.state;
        return (
            <div className="encrypt-DH col-sm-5 text-center">
        <h3 className="mt-5 mb-5">Trao đổi khóa Diffie-Hellman</h3>
        <form onSubmit={this.onSubmit} id="form6">
            <div className="row">
            <div className="form-group col-sm-6">
                <input type="number" className="form-control A5" placeholder="Nhập q" name="inputQ6" onChange={this.onInputChange} />
                <label htmlFor="input-encryptRSA-A5">(q là số nguyên tố)</label>
            </div>
            <div className="form-group col-sm-6">
                <input type="number" className="form-control B5" placeholder="Nhập a" name="inputA6" onChange={this.onInputChange} />
                <label htmlFor="input-encryptRSA-A5">(a là căn nguyên thủy của q)</label>
            </div>
            <div className="form-group col-sm-6">
                <input type="number" className="form-control A5" placeholder="Nhập khóa riêng Xᴀ" name="inputXA6" onChange={this.onInputChange} />
                <label htmlFor="input-encryptRSA-A5">(Xᴀ &lt; q)</label>
            </div>
            <div className="form-group col-sm-6">
                <input type="number" className="form-control B5" placeholder="Nhập khóa riêng Xʙ" name="inputXB6" onChange={this.onInputChange} />
                <label htmlFor="input-encryptRSA-A5">(Xʙ &lt; q)</label>
            </div>
            </div>
            <button type="submit" className="btn btn-primary col-sm-3 mt-5 mb-5 button1">XEM KẾT QUẢ</button>
            <h4 className="mb-2 col-sm-12 result" id="result6">{result6}</h4>
        </form>
        </div>

        )
    }
}
