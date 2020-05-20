import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <h4 className="text-center line-height h4-home">MODULO TOOL <br /> công cụ tính nhanh, kiểm tra Modulo</h4>
                    <p className="text-center pc line-height p-home">1. Tính A^B mod C (với số mũ lớn)
                        <br />2. Tính nhanh nghịch đảo modulo
                        <br />3. Kiểm tra căn nguyên thủy
                        <br />4. Tính Logarit rời rạc modulo
                        <br />5. Mã công khai RSA
                        <br />6. Trao đổi khoá Diffie-Hellman
                        <br />7. Mật mã Elgaman
                    </p>
                    <div className="mobile">
                        <h5 className="text-center" style={{color: '#231dc9'}}>Sử dụng chức năng tại MENU nhé</h5>
                    </div>
                    <footer className="text-center line-height">
                        <p>© Copyright 2020. All rights reserved.
                        <br /><b>Modulo Tool</b> is created by <a href="https://facebook.com/ducnh99" target="_blank" rel="noopener noreferrer" className="author">Nguyễn Đức</a></p>
                    </footer>
                    </div>

            </div>
        )
    }
}
