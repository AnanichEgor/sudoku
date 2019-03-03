class Sudoku {
  constructor(matrix) {
      this.matrix = matrix;
      for (let i = 0; i < 9; i++) {
          this.matrix[i].unshift(0);
      }
      this.matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  IsNextUnknown(s, p) {
      for (let ix = 1; ix < 10; ix++) {
          for (let iy = 1; iy < 10; iy++) {
              if (s[ix][iy] === 0) {
                  p.x = ix;
                  p.y = iy;
                  return true;
              }
          }
      }
      return false;
  }

  sudInLine(s, p, v) {
      for (let i = 1; i < 10; i++) {
          if (p.y !== i) {
              if (s[p.x][i] === v) {
                  return true;
              }
          }
      }
      return false;
  }

  sudInRow(s, p, v) {
      for (let i = 1; i < 10; i++) {
          if (p.x !== i) {
              if (s[i][p.y] === v) {
                  return true;
              }
          }
      }
      return false;
  }

  sudInSq(s, p, v) {
      let lx = 0;
      let ly = 0;
      if ([1, 2, 3].indexOf(p.x) > -1) lx = 1;
      if ([4, 5, 6].indexOf(p.x) > -1) lx = 4;
      if ([7, 8, 9].indexOf(p.x) > -1) lx = 7;

      lx -= 1;
      if ([1, 2, 3].indexOf(p.y) > -1) ly = 1;
      if ([4, 5, 6].indexOf(p.y) > -1) ly = 4;
      if ([7, 8, 9].indexOf(p.y) > -1) ly = 7;

      ly = ly - 1;

      for (let ix = 1; ix < 4; ix++) {
          for (let iy = 1; iy < 4; iy++) {
              if ((p.x !== lx + ix) && (p.y !== ly + iy)) {
                  if (s[lx + ix][ly + iy] === v) {
                      return true;
                  }
              }
          }
      }
      return false;
  }

  sudInAny(s, p, v) {
      let res1 = this.sudInLine(s, p, v);
      let res2 = this.sudInRow(s, p, v);
      let res3 = this.sudInSq(s, p, v);

      return (res1 || res2 || res3);
  }

  sudMod(s, p, v) {
      let st = s.slice(0);

      for (let i = 0; i < 10; i++) {
          st[i] = s[i].slice(0);
      }

      st[p.x][p.y] = v;
      return st;
  }

  getMas(s) {
      let st = s.slice(0);
      for (let i = 0; i < 10; i++) {
          st[i] = s[i].slice(0);
      }

      st.shift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      for (let i = 0; i < 9; i++) {
          st[i].shift(0);
      }
      return st;
  }

  calcSudoku(s) {
      let p = {};
      if (this.IsNextUnknown(s, p) === true) {
          for (let i = 1; i < 10; i++) {
              if (this.sudInAny(s, p, i) !== true) {
                  if (this.calcSudoku(this.sudMod(s, p, i)) === true) {
                      return true;
                  }
              }
          }
      }
      else {
          this.matrix = this.getMas(s);
          return;
      }
      return false;
  }

  getResult(){
      this.calcSudoku(this.matrix);
      return this.matrix;
  }
}

module.exports = function solveSudoku(matrix) {
  return new Sudoku(matrix).getResult();
}
