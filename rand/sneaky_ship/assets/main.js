// MAIN

const _canv = document.getElementById('canvas');
const _ctx = _canv.getContext('2d');

const _clrBlack = '#282c34';
const _clrRed = '#e05252';
const _clrGreen = '#43d08a';
const _clrYellow = '#ebde6b';
const _clrBlue = '#528bff';
const _clrWhite = '#abb2bf';

const _lineWidth = 2;
const _frict = 0.01;
const _oneRad = Math.PI / 180;
const _twoRad =  360 * _oneRad;
const _trnFrict = 0.8 * _oneRad;

const _lasers = [];
const _thruParticles = [];
const _explParticles = [];

const _ctrls = {
    'KeyW': false,
    'KeyA': false,
    'KeyD': false,
    'KeyJ': false
};

class Ship {
    constructor() {
        this.rad_wings = 10;
        this.rad_nose = 20;
        this.rad_thru = 10;
        this.pos_x = _canv.width / 2;
        this.pos_y = _canv.height / 2;
        this.vel_x = 0;
        this.vel_y = 0;
        this.acc = 0.1;
        this.trn_vel = 0;
        this.trn_acc = 0.15 * _oneRad;
        this.dir = 0 * _oneRad;
        this.dir_wing_l = this.dir - 120 * _oneRad;
        this.dir_wing_r = this.dir + 120 * _oneRad;
        this.dir_thru = this.dir + 180 * _oneRad;
    }

    update() {
        this.dir_wing_l = this.dir - 120 * _oneRad;
        this.dir_wing_r = this.dir + 120 * _oneRad;
        this.dir_thru = this.dir + 180 * _oneRad;

        if (_ctrls['KeyW']) {
            this.vel_x += this.acc * Math.cos(this.dir);
            this.vel_y += this.acc * Math.sin(this.dir);
            _thruParticles.push( new Particle( this.pos_x + this.rad_thru * Math.cos(this.dir_thru), this.pos_y + this.rad_thru * Math.sin(this.dir_thru), this.dir, _clrWhite ) );
        }
        if (_ctrls['KeyA']) {
            this.trn_vel -= this.trn_acc;
        }
        if (_ctrls['KeyD']) {
            this.trn_vel += this.trn_acc;
        }

        if (_ctrls['KeyJ']) {
            _lasers.push( new Laser( this.pos_x + this.rad_nose * Math.cos(this.dir), this.pos_y + this.rad_nose * Math.sin(this.dir), this.dir, this.vel_x, this.vel_y ) );
        }

        this.trn_vel -= this.trn_vel * _trnFrict;
        this.vel_x -= this.vel_x * _frict;
        this.vel_y -= this.vel_y * _frict;

        this.dir += this.trn_vel;
        this.pos_x += this.vel_x;
        this.pos_y += this.vel_y;

        this.dir = ( this.dir + _twoRad ) % _twoRad;
        this.pos_x = ( this.pos_x + _canv.width ) % _canv.width;
        this.pos_y = ( this.pos_y + _canv.height ) % _canv.height;
    }

    render() {
        _ctx.save();

        _ctx.lineWidth = _lineWidth;
        _ctx.strokeStyle = _clrRed;

        _ctx.beginPath();
        _ctx.moveTo( this.pos_x + this.rad_wings * Math.cos(this.dir_wing_l), this.pos_y + this.rad_wings * Math.sin(this.dir_wing_l) );  // wing left
        _ctx.lineTo( this.pos_x + this.rad_nose * Math.cos(this.dir), this.pos_y + this.rad_nose * Math.sin(this.dir) );                  // nose
        _ctx.lineTo( this.pos_x + this.rad_wings * Math.cos(this.dir_wing_r), this.pos_y + this.rad_wings * Math.sin(this.dir_wing_r) );  // wind right
        _ctx.closePath();
        _ctx.stroke();

        _ctx.restore();
    }
}

class Laser {
    constructor(pos_x, pos_y, dir, vel_x, vel_y) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.dir = dir;
        this.spd = 5;
        this.len = 10;
        this.vel_x = this.spd * Math.cos(this.dir) + vel_x;
        this.vel_y = this.spd * Math.sin(this.dir) + vel_y;
    }

    update(ind) {
        if (this.pos_x > _canv.width || this.pos_x < 0 || this.pos_y > _canv.height || this.pos_y < 0) {
            _lasers.splice(ind, 1);
            for (let i = 0; i < 5; i++) {
                _explParticles.push( new Particle( this.pos_x, this.pos_y, this.dir, _clrGreen ) );
            }
        } else {
            this.pos_x += this.vel_x;
            this.pos_y += this.vel_y;
        }
    }

    render() {
        _ctx.save();

        _ctx.lineWidth = _lineWidth;
        _ctx.strokeStyle = _clrGreen;

        _ctx.beginPath();
        _ctx.moveTo(this.pos_x, this.pos_y);
        _ctx.lineTo( this.pos_x + this.len * Math.cos(this.dir), this.pos_y + this.len * Math.sin(this.dir) );
        _ctx.stroke();

        _ctx.restore();

    }
}

class Particle {
    constructor(pos_x, pos_y, dir, clr) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.life = Math.floor( Math.random() * 50 ) + 25;
        this.clr = clr;
        this.dir = ( dir - 180 * _oneRad ) + ( Math.floor( Math.random() * 60 ) - 30 ) * _oneRad;
        this.vel_x = ( Math.floor( Math.random() * 2 ) + 1 ) * Math.cos(this.dir);
        this.vel_y = ( Math.floor( Math.random() * 2 ) + 1 ) * Math.sin(this.dir);
    }

    update(arr, ind) {
        this.life--;
        if (this.life < 0) {
            arr.splice(ind, 1);
        } else {
            this.pos_x += this.vel_x;
            this.pos_y += this.vel_y;
        }
    }

    render() {
        _ctx.save();

        _ctx.fillStyle = this.clr;

        _ctx.beginPath();
        _ctx.arc(this.pos_x, this.pos_y, 1, 0, _twoRad);
        _ctx.fill();

        _ctx.restore();
    }
}

function updateCanvDimen() {
    _canv.width = window.innerWidth;
    _canv.height = window.innerHeight;
}

function updateCtrls(evn) {
    if (_ctrls[evn.code] !== undefined) {
        _ctrls[evn.code] = evn.type === "keydown";
    }
}

function updateEnv() {
    _player.update();
    _lasers.forEach((laser, ind) => {
        laser.update(ind);
    });
    _thruParticles.forEach((particle, ind, arr) => {
        particle.update(arr, ind);
    });
    _explParticles.forEach((particle, ind, arr) => {
        particle.update(arr, ind);
    });
}

function renderEnv() {
    _ctx.clearRect( 0, 0, _canv.width, _canv.height );
    _player.render();
    _lasers.forEach((laser) => {
        laser.render();
    });
    _thruParticles.forEach((particle) => {
        particle.render();
    });
    _explParticles.forEach((particle) => {
        particle.render();
    });
}

function main() {
    updateEnv();
    renderEnv();
    window.requestAnimationFrame(main);
}

// init
updateCanvDimen();
window.addEventListener('resize', updateCanvDimen);
window.addEventListener('keydown', updateCtrls);
window.addEventListener('keyup', updateCtrls);
const _player = new Ship();

window.requestAnimationFrame(main);
