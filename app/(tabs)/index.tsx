// SvgTimeline.tsx
import React from "react";
import { View } from "react-native";
import Svg, {
  Circle,
  Defs,
  G,
  Marker,
  Path,
  Rect,
  Text,
  TSpan,
} from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  style?: any;
};

export default function SvgTimeline({ width = 800, height = 225, style }: Props) {
  // header positions / sizing (for underline fallback)
  const headerX = 340;
  const headerFontSize = 11; // ตามต้นฉบับ
  const em = headerFontSize;
  const firstDy = 1.2 * em; // 1.2em
  const secondDy = firstDy + 1.2 * em; // cumulative for second tspan group
  // ข้อความที่จะขีดเส้นใต้ (ตามต้นฉบับ)
  const underlineText = "ทดสอบระบบงับ";
  const approxWidth = underlineText.length * headerFontSize * 0.6; // ประมาณความกว้าง
  const underlineY = secondDy + 2; // วางเส้นใต้เล็กน้อยใต้ baseline

  return (
    <View style={style}>
      <Svg width={width} height={height} viewBox="0 0 800 225">
        <Defs>
          {/* markers — หัวลูกศรเป็นสีดำตามที่ขอ */}
          <Marker
            id="Triangle"
            viewBox="0 0 10 10"
            refX={5}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto"
          >
            <Path d="M 0 0 L 10 5 L 0 10 z" fill="#000" stroke="#000" />
          </Marker>

          <Marker
            id="TriangleStart"
            viewBox="0 0 10 10"
            refX={5}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto"
          >
            <Path d="M -2 5 L 8 0 L 8 10 z" fill="#000" stroke="#000" />
          </Marker>

          <Marker
            id="TriangleSmall"
            viewBox="0 0 10 10"
            refX={5}
            refY={5}
            markerWidth={4}
            markerHeight={4}
            orient="auto"
          >
            <Path d="M 0 0 L 10 5 L 0 10 z" fill="#000" stroke="#000" />
          </Marker>

          <Marker
            id="TriangleStartSmall"
            viewBox="0 0 10 10"
            refX={5}
            refY={5}
            markerWidth={4}
            markerHeight={4}
            orient="auto"
          >
            <Path d="M -2 5 L 8 0 L 8 10 z" fill="#000" stroke="#000" />
          </Marker>
        </Defs>

        {/* Top inner svg group (x=90, y=0, width=680 height=100) */}
        <G x={90} y={0}>
          <Rect x={160} y={0} width={360} height={100} fill="none" />

          {/* Header text block (centered at x=340) */}
          <Text
            id="header02TST1"
            x={headerX}
            y={0}
            fontFamily="Tahoma"
            fontSize={headerFontSize}
            textAnchor="middle"
          >
            <TSpan x={headerX} dy={`${firstDy}`} textAnchor="middle">
              <TSpan fontWeight="bold">{"กรณีทดสอบระบบ:"}</TSpan>
              <TSpan>{" ทดสอบระบบงับ "}</TSpan>
            </TSpan>

            <TSpan x={headerX} dy={`${1.2}em`} textAnchor="middle">
              {/* ใส่ textDecoration เผื่อเวอร์ชันรองรับ */}
              <TSpan fontWeight="bold" textDecoration="underline">
                {underlineText}
              </TSpan>
              <TSpan fontWeight="bold">
                {"ทดสอบระบบงับทดสอบระบบงับทดสอบระบบงับทดสอบระบบงับ"}
              </TSpan>
              <TSpan>{" ทดสอบระบบงับ"}</TSpan>
            </TSpan>

            <TSpan x={headerX} dy={`${1.2}em`} textAnchor="middle">
              <TSpan>{"(ทดสอบระบบงับ)"}</TSpan>
            </TSpan>
          </Text>

          {/* Fallback underline (เส้นใต้สำรอง ถ้า textDecoration ไม่แสดง) */}
          <Path
            d={`M ${headerX - approxWidth / 2} ${underlineY} L ${headerX + approxWidth / 2} ${underlineY}`}
            stroke="#000"
            strokeWidth={1}
          />

          {/* Top horizontal lines with arrow markers */}
          <Path
            d="M130,20.7L0,20.7"
            stroke="#008fa1"
            strokeWidth={2}
            markerEnd="url(#Triangle)"
            fill="none"
          />
          <Path
            d="M550,20.7L680,20.7"
            stroke="#008fa1"
            strokeWidth={2}
            markerEnd="url(#Triangle)"
            fill="none"
          />
        </G>

        {/* Lower timeline group (x=90, y=130) */}
        <G x={90} y={130}>
          {[
            0, 126, 252, 302, 428, 554, 680,
          ].map((cx, i) => (
            <Circle
              key={`c-${i}`}
              cx={cx}
              cy={0}
              r={5}
              stroke="#c9db30"
              fill="rgb(201, 219, 48)"
            />
          ))}

          {/* Vertical small arrow paths above each circle (arrowheads are black now) */}
          <Path d="M 0 0 L 0 -35" stroke="#008fa1" strokeWidth={2} markerEnd="url(#Triangle)" />
          <Path d="M 126 0 L 126 -35" stroke="#008fa1" strokeWidth={2} markerEnd="url(#Triangle)" />
          <Path d="M 252 0 L 252 -35" stroke="#008fa1" strokeWidth={2} markerEnd="url(#Triangle)" />
          <Path d="M 302 0 L 302 -35" stroke="#008fa1" strokeWidth={2} markerEnd="url(#Triangle)" />
          <Path d="M 428 0 L 428 -35" stroke="#008fa1" strokeWidth={2} markerEnd="url(#Triangle)" />
          <Path d="M 554 0 L 554 -35" stroke="#008fa1" strokeWidth={2} markerEnd="url(#Triangle)" />
          <Path d="M 680 0 L 680 -45" stroke="#008fa1" strokeWidth={2} markerEnd="url(#Triangle)" />

          {/* Horizontal connections */}
          <Path d="M 0 0 L 126 0" stroke="#008fa1" strokeWidth={2} fill="none" />
          <Path d="M 126 0 L 252 0" stroke="#008fa1" strokeWidth={2} fill="none" />
          <Path
            d="M 252 0 L 267 0 L 272 -10 L 282 10 L 287 0 L 302 0"
            stroke="#008fa1"
            strokeWidth={2}
            fill="none"
          />
          <Path d="M 302 0 L 428 0" stroke="#008fa1" strokeWidth={2} fill="none" />
          <Path d="M 428 0 L 554 0" stroke="#008fa1" strokeWidth={2} fill="none" />
          <Path d="M 554 0 L 680 0" stroke="#008fa1" strokeWidth={2} fill="none" />

          {/* Top small labels */}
          <Text x={0} y={-45} fontFamily="Tahoma" fontSize={8} textAnchor="middle">
            50,000
          </Text>
          <Text x={126} y={-45} fontFamily="Tahoma" fontSize={8} textAnchor="middle">
            50,000
          </Text>
          <Text x={252} y={-45} fontFamily="Tahoma" fontSize={8} textAnchor="middle">
            50,000
          </Text>
          <Text x={302} y={-45} fontFamily="Tahoma" fontSize={8} textAnchor="middle">
            50,000
          </Text>
          <Text x={428} y={-45} fontFamily="Tahoma" fontSize={8} textAnchor="middle">
            50,000
          </Text>
          <Text x={554} y={-45} fontFamily="Tahoma" fontSize={8} textAnchor="middle">
            50,000
          </Text>
          <Text x={680} y={-55} fontFamily="Tahoma" fontSize={8} textAnchor="middle">
            55,000
          </Text>

          {/* bottom row numbers */}
          <Text x={0} y={15} fontFamily="Tahoma" fontSize={10} fontWeight="normal" textAnchor="middle" fill="#333">
            1
          </Text>
          <Text x={126} y={15} fontFamily="Tahoma" fontSize={10} fontWeight="normal" textAnchor="middle" fill="#333">
            2
          </Text>
          <Text x={252} y={15} fontFamily="Tahoma" fontSize={10} fontWeight="normal" textAnchor="middle" fill="#333">
            3
          </Text>
          <Text x={302} y={15} fontFamily="Tahoma" fontSize={10} fontWeight="normal" textAnchor="middle" fill="#333">
            7
          </Text>
          <Text x={428} y={15} fontFamily="Tahoma" fontSize={10} fontWeight="normal" textAnchor="middle" fill="#333">
            8
          </Text>
          <Text x={554} y={15} fontFamily="Tahoma" fontSize={10} fontWeight="normal" textAnchor="middle" fill="#333">
            9
          </Text>
          <Text x={680} y={15} fontFamily="Tahoma" fontSize={10} fontWeight="normal" textAnchor="middle" fill="#333">
            10
          </Text>

          <Path d="M126,25L126,45" stroke="#008fa1" strokeWidth={2} markerEnd="url(#Triangle)" />
          <Text x={126} y={75} fontFamily="Tahoma" fontSize={10} textAnchor="middle">
            ชำระเบี้ยครบ
          </Text>
        </G>

        {/* outer text */}
        <Text x={0} y={134} fontFamily="Tahoma" fontSize={12}>
          สิ้นปีกรมธรรม์ที่
        </Text>
      </Svg>
    </View>
  );
}
