<template>
    <div class="jq22-container">
        <div class="login-wrap">
            <div class="login-html">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1"
                    class="tab">登录</label>
                <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">注册</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <div class="group">
                            <label for="user" class="label">Username</label>
                            <input id="user" type="text" class="input">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Password</label>
                            <input id="pass" type="password" class="input" data-type="password">
                        </div>
                        <div class="group">
                            <input id="check" type="checkbox" class="check" checked>
                            <label for="check"><span class="icon"></span>记住密码</label>
                        </div>
                        <div class="group">
                            <input type="submit" class="button" value="登录">
                        </div>
                        <div class="hr"></div>
                        <div class="foot-lnk"><a href="#forgot">忘记密码？</a></div>
                    </div>
                    <div class="sign-up-htm">
                        <div class="group">
                            <label for="user" class="label">Username</label>
                            <input id="user" type="text" class="input">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Password</label>
                            <input id="pass" type="password" class="input" data-type="password">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Repeat Password</label>
                            <input id="pass" type="password" class="input" data-type="password">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Email Address</label>
                            <input id="pass" type="text" class="input">
                        </div>
                        <div class="group"><input type="submit" class="button" value="Sign Up"></div>
                        <div class="hr"></div>
                        <div class="foot-lnk"><label for="tab-1">Already Member?</label></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.jq22-container {
    width: 100%;
    font-size: 16px;
}

.clearfix:after,
.clearfix:before {
    content: '';
    display: table
}

.clearfix:after {
    clear: both;
    display: block
}

a {
    color: inherit;
    text-decoration: none;
}

input,
button {
    outline: none;
    border: none;
}

.login-wrap {
    width: 100%;
    margin: auto;
    /* background: url(../img/bg.jpg) no-repeat center; */
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
}

.login-html {
    height: 100%;
    position: absolute;
    left: 0;
    top: 45px;
    right: 0;
    bottom: 0;
    padding: 10px;
    // background: rgba(40, 57, 101, .9);
    background: #fff;
}

.login-html .sign-in-htm,
.login-html .sign-up-htm {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: all .4s linear;
    transition: all .4s linear;
}

.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check {
    display: none;
}

.login-html .tab,
.login-form .group .label,
.login-form .group .button {
    text-transform: uppercase;
}

.login-html .tab {
    font-size: 22px;
    margin-right: 15px;
    padding-bottom: 5px;
    margin: 0 15px 10px 0;
    display: inline-block;
    border-bottom: 2px solid transparent;
}

.login-html .sign-in:checked+.tab,
.login-html .sign-up:checked+.tab {
    color: #1161ee;
    border-color: #1161ee;
}

.login-form {
    width: 90%;
    position: relative;
    -webkit-perspective: 1000px;
    perspective: 1000px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.login-form .group {
    margin-bottom: 15px;
}

.login-form .group .label,
.login-form .group .input,
.login-form .group .button {
    width: 100%;
    margin: 20px 0;
    color: #666;
    display: block;
}

.login-form .group .input,
.login-form .group .button {
    background-color: #f2f2f2;
    color: #666;
    padding: 10px 20px;
    margin: 20px 0;
    border: none;
    border-radius: 25px;
}

.login-form .group .button {
    color: #fff
}

.login-form .group input[data-type="password"] {
    text-security: circle;
    -webkit-text-security: circle;
}

.login-form .group .label {
    color: #aaa;
    font-size: 12px;
}

.login-form .group .button {
    background: #1161ee;
}

.login-form .group label .icon {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    position: relative;
    display: inline-block;
    background: rgba(255, 255, 255, .1);
}

.login-form .group label .icon:before,
.login-form .group label .icon:after {
    content: '';
    width: 10px;
    height: 2px;
    background: #fff;
    position: absolute;
    -webkit-transition: all .2s ease-in-out 0s;
    transition: all .2s ease-in-out 0s;
}

.login-form .group label .icon:before {
    left: 3px;
    width: 5px;
    bottom: 6px;
    -webkit-transform: scale(0) rotate(0);
    -ms-transform: scale(0) rotate(0);
    transform: scale(0) rotate(0);
}

.login-form .group label .icon:after {
    top: 6px;
    right: 0;
    -webkit-transform: scale(0) rotate(0);
    -ms-transform: scale(0) rotate(0);
    transform: scale(0) rotate(0);
}

.login-form .group .check:checked+label {
    color: #1161ee;
}

.login-form .group .check:checked+label .icon {
    background: #1161ee;
    margin-right: 10px;
    vertical-align: middle;
}

.login-form .group .check:checked+label .icon:before {
    -webkit-transform: scale(1) rotate(45deg);
    -ms-transform: scale(1) rotate(45deg);
    transform: scale(1) rotate(45deg);
}

.login-form .group .check:checked+label .icon:after {
    -webkit-transform: scale(1) rotate(-45deg);
    -ms-transform: scale(1) rotate(-45deg);
    transform: scale(1) rotate(-45deg);
}

.login-html .sign-in:checked+.tab+.sign-up+.tab+.login-form .sign-in-htm {
    -webkit-transform: rotate(0);
    -ms-transform: rotate(0);
    transform: rotate(0);
}

.login-html .sign-up:checked+.tab+.login-form .sign-up-htm {
    -webkit-transform: rotate(0);
    -ms-transform: rotate(0);
    transform: rotate(0);
}

.hr {
    width: 95vw;
    height: 2px;
    margin: 60px 0 50px 0;
    background: rgba(255, 255, 255, .2);
}

.foot-lnk {
    text-align: center;
}
</style>