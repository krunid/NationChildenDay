// ข้อสอบ
const q = [
    {q:"วันเด็กตรงกับวันใด?",o:["เสาร์ที่2 มกราคม","อาทิตย์ที่2 มกราคม","เสาร์แรก มกราคม","อาทิตย์แรก มกราคม"],c:0},
    {q:"คำขวัญวันเด็กแห่งชาติ 2568 จากนายกรัฐมนตรี?",o:["รู้คิด รู้เท่าทัน สร้างสรรค์สิ่งใหม่ เรียนรู้ตลอดเวลา พัฒนาอย่างยั่งยืน","เรียนรู้ตลอดเวลา พัฒนา รู้เท่าทัน สร้างสรรค์อนาคต","เรียนรู้ คู่คุณธรรม เท่าทันเทคโนโลยี มีจิตอาสา พัฒนาสังคม","เด็กไทยยุคใหม่ เรียนรู้อย่างเข้าใจ ก้าวไกลสู่อนาคต"],c:0},
    {q:"วันเด็กแห่งชาติของไทยเริ่มจัดครั้งแรกปีใด?",o:["2498","2499","2500","2501"],c:0},
    {q:"สถานที่ใดที่เปิดให้เด็กเข้าชมฟรีในวันเด็กแห่งชาติ?",o:["สวนสัตว์","พิพิธภัณฑ์","ทำเนียบรัฐบาล","ถูกทุกข้อ"],c:3},
    {q:"กิจกรรมใดที่มักจัดเป็นประจำในวันเด็กแห่งชาติ?",o:["การแสดงดนตรี","การแข่งขันตอบปัญหา","การจัดนิทรรศการ","ถูกทุกข้อ"],c:3},
    {q:"สิทธิขั้นพื้นฐานของเด็กมีกี่ประการ?",o:["2 ประการ","3 ประการ","4 ประการ","5 ประการ"],c:2},
    {q:"ข้อใดไม่ใช่สิทธิขั้นพื้นฐานของเด็ก?",o:["สิทธิที่จะมีชีวิตรอด","สิทธิที่จะได้รับการพัฒนา","สิทธิที่จะได้รับการปกป้อง","สิทธิที่จะได้ขับรถ"],c:3},
    {q:"หน่วยงานใดเป็นผู้รับผิดชอบหลักในการจัดงานวันเด็กแห่งชาติ?",o:["กระทรวงศึกษาธิการ","กระทรวงวัฒนธรรม","กระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์","กระทรวงมหาดไทย"],c:0},
    {q:"วันเด็กสากลคือ?",o:["1 มิถุนายน","20 พฤศจิกายน","5 ธันวาคม","25 ธันวาคม"],c:0},
    {q:"อายุเท่าไรจึงจะถือว่าเป็น 'เด็ก' ตามอนุสัญญาว่าด้วยสิทธิเด็ก?",o:["ต่ำกว่า 15 ปี","ต่ำกว่า 18 ปี","ต่ำกว่า 20 ปี","ต่ำกว่า 21 ปี"],c:1}
];

const n = q.length;
let i = 0, s = 0, ans = [], name = '';

// แสดง Modal ตอนโหลดหน้า
window.onload = () => {
    document.getElementById('nameModal').style.display = 'block';
};

// เริ่มทำแบบทดสอบ
function startQuiz() {
    name = document.getElementById('studentName').value.trim();
    if(!name) {
        alert('กรุณากรอกชื่อ-นามสกุล');
        return;
    }
    document.getElementById('nameModal').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';

    // เพิ่มแถบคะแนน
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.className = 'score-display';
    scoreDisplay.innerHTML = `คะแนน: <span class="score-number">0/${n}</span>`;
    document.body.appendChild(scoreDisplay);

    show();
}

// แสดงคำถาม
function show() {
    if(i >= n) {
        end();
        return;
    }
    document.getElementById('prog').style.width = ((i+1)/n*100) + "%";
    document.getElementById('quiz').innerHTML = `
        <div class="question">
            <h3>ข้อที่ ${i+1}</h3>
            <p>${q[i].q}</p>
            ${q[i].o.map((x,j)=>`<div class="option" onclick="pick(${j})">${x}</div>`).join('')}
        </div>
    `;
}

// เลือกคำตอบ
function pick(x) {
    const options = document.querySelectorAll('.option');
    ans[i] = x;
    q[i].o.forEach((_,j) => {
        if(j === q[i].c) options[j].classList.add('correct');
        else if(j === x) options[j].classList.add('incorrect');
    });
    if(x === q[i].c) s++;
    document.querySelector('.score-number').textContent = `${s}/${n}`;
    setTimeout(() => {i++; show();}, 1500);
}

// จบแบบทดสอบ
function end() {
    const p = (s/n*100);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerHTML = `
        <h2>ผลการทดสอบ</h2>
        <p>คุณ ${name}</p>
        <p>ได้ ${s}/${n} คะแนน (${p.toFixed(2)}%)</p>
        ${p>=70?`
            <button class="btn" onclick="cert(true)">แสดงเกียรติบัตร</button>
        `:`
            <p style="color:#f44336">คุณได้คะแนนไม่ถึง 70% กรุณาลองใหม่</p>
            <button class="btn" onclick="location.reload()">เริ่มใหม่</button>
        `}
        <button class="btn" onclick="compare()">เปรียบเทียบคำตอบ</button>
    `;
}

// แสดงเกียรติบัตร
function cert(fromQuiz=false) {
    if(!fromQuiz) {
        alert('กรุณาทำแบบทดสอบก่อนรับเกียรติบัตร');
        return;
    }
    const cert = document.getElementById('result');
    cert.innerHTML = `
        <div style="background:#fff;padding:40px;margin:20px auto;max-width:800px;border:2px solid #4CAF50;border-radius:10px;">
            <h1 style="text-align:center;color:#2E7D32;margin-bottom:30px;">เกียรติบัตร</h1>
            <h2 style="text-align:center;margin:20px 0;">ขอมอบเกียรติบัตรฉบับนี้ให้แก่</h2>
            <h2 style="text-align:center;color:#1B5E20;margin:20px 0;">${name}</h2>
            <p style="text-align:center;font-size:1.2em;margin:20px 0;">ได้ผ่านการทดสอบความรู้เรื่อง "วันเด็กแห่งชาติ"</p>
            <p style="text-align:center;font-size:1.2em;margin:20px 0;">ด้วยคะแนน ${s} คะแนน จากทั้งหมด ${n} คะแนน</p>
            <p style="text-align:center;font-size:1.2em;margin:20px 0;">คิดเป็นร้อยละ ${((s/n)*100).toFixed(2)}</p>
            <p style="text-align:center;margin-top:40px;">ให้ไว้ ณ วันที่ ${new Date().toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</p>
        </div>
        <div style="text-align:center;margin-top:20px;">
            <button class="btn" onclick="downloadCert()">ดาวน์โหลดเกียรติบัตร</button>
            <button class="btn" onclick="compare()">เปรียบเทียบคำตอบ</button>
            <button class="btn" onclick="location.reload()">เริ่มใหม่</button>
        </div>
    `;
}

// ดาวน์โหลดเกียรติบัตร PDF
function downloadCert() {
    pdfMake.fonts = {
        Sarabun: {
            normal: 'https://fonts.googleapis.com/css2?family=Sarabun:wght@400',
            bold: 'https://fonts.googleapis.com/css2?family=Sarabun:wght@700'
        }
    };

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        content: [
            {
                text: 'เกียรติบัตร',
                style: 'header',
                alignment: 'center',
                margin: [0, 50, 0, 20]
            },
            {
                text: 'ขอมอบเกียรติบัตรฉบับนี้เพื่อแสดงว่า',
                alignment: 'center',
                margin: [0, 20, 0, 20]
            },
            {
                text: name,
                style: 'subheader',
                alignment: 'center',
                margin: [0, 10, 0, 20]
            },
            {
                text: 'ได้ผ่านการทดสอบความรู้เรื่อง "วันเด็กแห่งชาติ"',
                alignment: 'center',
                margin: [0, 20, 0, 10]
            },
            {
                text: `ด้วยคะแนน ${s} คะแนน จากทั้งหมด ${n} คะแนน`,
                alignment: 'center',
                margin: [0, 20, 0, 20]
            },
            {
                text: `คิดเป็นร้อยละ ${((s/n)*100).toFixed(2)}`,
                alignment: 'center',
                margin: [0, 0, 0, 50]
            },
            {
                text: new Date().toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                alignment: 'center',
                margin: [0, 50, 0, 0]
            }
        ],
        defaultStyle: {
            font: 'Sarabun'
        },
        styles: {
            header: {
                fontSize: 28,
                bold: true
            },
            subheader: {
                fontSize: 20,
                bold: true
            }
        }
    };

    pdfMake.createPdf(docDefinition).download(`certificate_${name}.pdf`);
}

// เปรียบเทียบคำตอบ
function compare() {
    document.getElementById('result').innerHTML = `
        <h2>เปรียบเทียบคำตอบ</h2>
        ${q.map((x,j)=>`
            <div class="question">
                <p><b>ข้อ ${j+1}:</b> ${x.q}</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0;">
                    <div style="background:#fff3e0;padding:10px;border-radius:5px;">
                        <h4>คำตอบของคุณ</h4>
                        <p>${x.o[ans[j]]}</p>
                        <p>${ans[j]===x.c?'✓ ถูกต้อง':'✗ ไม่ถูกต้อง'}</p>
                    </div>
                    <div style="background:#e8f5e9;padding:10px;border-radius:5px;">
                        <h4>เฉลย</h4>
                        <p>${x.o[x.c]}</p>
                    </div>
                </div>
            </div>
        `).join('')}
        <button class="btn" onclick="location.reload()">เริ่มใหม่</button>
    `;
}
