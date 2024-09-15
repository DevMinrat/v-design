window.addEventListener("load", () => {
  const promElems = document.querySelectorAll(".promotions__item");
  let width = document.documentElement.clientWidth;

  const canv = document.querySelector("#promotions-balls");

  if (canv) {
    const ctx = canv.getContext("2d");
    const FPS = 60;

    let MAX_VELOCITY;
    if (width > 767) {
      MAX_VELOCITY = 150;
    } else {
      MAX_VELOCITY = 80;
    }

    const BALLS_Q = promElems.length;
    let balls = [];
    canv.width = document.documentElement.clientWidth;
    canv.height = 760;

    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    const cancelAnimationFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    let AnimationFrame;
    let timeout;

    window.addEventListener("resize", () => {
      if (document.documentElement.clientWidth !== width) {
        width = document.documentElement.clientWidth;

        if (AnimationFrame) cancelAnimationFrame(AnimationFrame);
        if (timeout) clearTimeout(timeout);

        canv.width = document.documentElement.clientWidth;
        canv.height = 760;

        timeout = setTimeout(() => {
          balls = [];
          createBalls();
          AnimationFrame = requestAnimationFrame(loop);
        }, 200);
      }
    });

    class Ball {
      constructor({ count, descr, text, idx, img }) {
        this.count = count;
        this.descr = descr;
        this.text = text;
        this.img = img;

        if (canv.width > 1023) {
          this.radius = 140;
        } else if (canv.width > 767) {
          this.radius = 120;
        } else {
          this.radius = 80;
        }

        this.maxBRow = Math.floor(canv.width / (this.radius * 2 + 10));
        this.bWidth = this.radius * 2;

        this.x =
          idx > this.maxBRow * 3
            ? this.bWidth * (idx - this.maxBRow * 3) + idx * 10 - this.radius
            : idx > this.maxBRow * 2
            ? this.bWidth * (idx - this.maxBRow * 2) + idx * 10 - this.radius
            : idx > this.maxBRow
            ? this.bWidth * (idx - this.maxBRow) + idx * 10 - this.radius
            : this.bWidth * idx + idx * 10 - this.radius;

        this.y =
          idx > this.maxBRow * 3
            ? this.radius * 7 + idx * 10
            : idx > this.maxBRow * 2
            ? this.radius * 5 + idx * 10
            : idx > this.maxBRow
            ? this.radius * 3 + idx * 10
            : this.radius + idx * 10;

        this.color = "#ffffff";
        this.velocityX = ((Math.random() * 2 - 1) * MAX_VELOCITY) / FPS;
        this.velocityY = ((Math.random() * 2 - 1) * MAX_VELOCITY) / FPS;
        this.collided = false;
      }

      drawCircle() {
        ctx.fillStyle = this.color;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(33, 33, 33, 0.08)";

        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = "#f5f5f5";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.restore();

        if (this.count) {
          let countWidth = ctx.measureText(this.count).width;
          let descrWidth = ctx.measureText(this.descr).width;

          let countPosX =
            countWidth > descrWidth
              ? this.x - descrWidth
              : this.x - descrWidth + 10;

          let posY;
          if (canv.width > 1023) {
            posY = this.y - 30;
          } else if (canv.width > 767) {
            posY = this.y - 20;
          } else {
            posY = this.y - 10;
          }

          ctx.fillStyle = "#EB5757";

          if (canv.width > 1023) {
            ctx.font = "bold 36px Commissioner";
          } else if (canv.width > 767) {
            ctx.font = "bold 30px Commissioner";
          } else {
            ctx.font = "bold 24px Commissioner";
          }

          ctx.fillText(this.count, countPosX, posY);

          ctx.save();

          ctx.fillStyle = "#212121";

          if (canv.width > 1023) {
            ctx.font = "bold 24px Commissioner";
          } else if (canv.width > 767) {
            ctx.font = "bold 18px Commissioner";
          } else {
            ctx.font = "bold 14px Commissioner";
          }

          ctx.fillText(this.descr, this.x + countWidth, posY - 5);
        } else {
          if (canv.width > 1023) {
            ctx.drawImage(this.img, this.x - 48, this.y - 96, 96, 96);
          } else if (canv.width > 767) {
            ctx.drawImage(this.img, this.x - 40, this.y - 80, 80, 80);
          } else {
            ctx.drawImage(this.img, this.x - 32, this.y - 54, 64, 64);
          }
        }

        ctx.restore();

        ctx.textAlign = "center";
        ctx.fillStyle = "#616161";

        let widthText;
        let lhText;

        if (canv.width > 1023) {
          ctx.font = "18px Commissioner";
          widthText = 175;
          lhText = 27;
        } else if (canv.width > 767) {
          ctx.font = "16px Commissioner";
          widthText = 155;
          lhText = 22;
        } else {
          ctx.font = "12px Commissioner";
          widthText = 125;
          lhText = 18;
        }

        if (this.count) {
          wrapText(ctx, this.text, this.x, this.y + 20, widthText, lhText);
        } else {
          wrapText(ctx, this.text, this.x, this.y + 40, widthText, lhText);
        }

        function wrapText(context, text, x, y, maxWidth, lineHeight) {
          var words = text.split(" ");
          var line = "";

          for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + " ";
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
              context.fillText(line, x, y);
              line = words[n] + " ";
              y += lineHeight;
            } else {
              line = testLine;
            }
          }
          context.fillText(line, x, y);
        }
      }
    }

    // creating balls

    function createBalls() {
      for (let i = 0; i < BALLS_Q; i++) {
        let promCount = document.querySelectorAll(
          ".promotions-item__heading-count"
        );
        let promDescr = document.querySelectorAll(
          ".promotions-item__heading-descr"
        );
        let promText = document.querySelectorAll(".promotions-item__descr");
        let cleanText = document.querySelectorAll(".office-clean__descr");
        let cleanImg = document.querySelectorAll(".office-clean__img");

        balls[i] = new Ball({
          count: promCount[i] && promCount[i].innerText,
          descr: promCount[i] && promDescr[i].innerText.toUpperCase(),
          text:
            (promCount[i] && promText[i].innerText) || cleanText[i].innerText,
          idx: i + 1,
          img: cleanImg[i],
        });
        balls[i].drawCircle();
      }
    }

    createBalls();

    AnimationFrame = requestAnimationFrame(loop);

    function massCoefficient(m1, m2) {
      return (2 * m1) / (m1 + m2);
    }

    function velocityСoefficient(v1x, v1y, v2x, v2y, x1, y1, x2, y2) {
      return (
        ((v1x - v2x) * (x1 - x2) + (v1y - v2y) * (y1 - y2)) /
        (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
      );
    }

    // aligning balls in order to preserve them from stuck in each other
    function alignBalls(b1, b2, v, d, ed) {
      b2.x = b1.x - (v[0] * ed) / d;
      b2.y = b1.y - (v[1] * ed) / d;
    }

    function collision(b1, b2) {
      // trying to make it shorter...
      let mc1 = massCoefficient(b2.radius, b1.radius);
      let mc2 = massCoefficient(b1.radius, b2.radius);
      let vc1 = velocityСoefficient(
        b1.velocityX,
        b1.velocityY,
        b2.velocityX,
        b2.velocityY,
        b1.x,
        b1.y,
        b2.x,
        b2.y
      );
      let vc2 = velocityСoefficient(
        b2.velocityX,
        b2.velocityY,
        b1.velocityX,
        b1.velocityY,
        b2.x,
        b2.y,
        b1.x,
        b1.y
      );
      b1.velocityX = b1.velocityX - mc1 * vc1 * (b1.x - b2.x);
      b1.velocityY = b1.velocityY - mc1 * vc1 * (b1.y - b2.y);
      b2.velocityX = b2.velocityX - mc2 * vc2 * (b2.x - b1.x);
      b2.velocityY = b2.velocityY - mc2 * vc2 * (b2.y - b1.y);
      // moving the second ball because it'll be skipped as a collided
      move(b2);
    }

    // changing the position of the ball and displaying it
    function move(b) {
      b.y += b.velocityY;
      b.x += b.velocityX;
      // rebound from the walls
      if (b.y - b.radius <= 0) {
        b.y = b.radius;
        b.velocityY = -b.velocityY;
      } else if (b.y + b.radius >= canv.height) {
        b.y = canv.height - b.radius;
        b.velocityY = -b.velocityY;
      }
      if (b.x - b.radius <= 0) {
        b.x = b.radius;
        b.velocityX = -b.velocityX;
      } else if (b.x + b.radius >= canv.width) {
        b.x = canv.width - b.radius;
        b.velocityX = -b.velocityX;
      }
      b.drawCircle();
    }

    function loop() {
      // clearing the whole canvas
      ctx.clearRect(0, 0, canv.width, canv.height);
      balls.forEach((b) => {
        b.collided = false;
      });
      for (let i = 0; i < balls.length; i++) {
        if (balls[i].collided) continue;
        for (let j = 0; j < balls.length; j++) {
          if (i == j || balls[j].collided) continue;
          let vector = [balls[i].x - balls[j].x, balls[i].y - balls[j].y];
          let distance = Math.sqrt(
            Math.pow(vector[0], 2) + Math.pow(vector[1], 2)
          );
          let expected_distance = balls[i].radius + balls[j].radius;
          // collision check
          if (distance <= expected_distance) {
            balls[i].collided = true;
            balls[j].collided = true;
            if (distance != expected_distance) {
              alignBalls(
                balls[i],
                balls[j],
                vector,
                distance,
                expected_distance
              );
            }
            collision(balls[i], balls[j]);
            break;
          }
        }
        move(balls[i]);
      }
      AnimationFrame = requestAnimationFrame(loop);
    }
  }
});
