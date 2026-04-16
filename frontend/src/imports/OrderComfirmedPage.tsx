import svgPaths from "./svg-7n328hsve8";
import imgImageWithFallback from "figma:asset/0329160e8d20c0ec3d3f841e841d7c8bd8cc5e10.png";
import imgImageWithFallback1 from "figma:asset/ca61ce4714bdaca8d78c37f5a13f723b8f59bda2.png";
import imgImageWithFallback2 from "figma:asset/a5dacdd80b75a616e76732bc621f3b1b9b7184c2.png";
import imgImageWithFallback3 from "figma:asset/1a7187315caa455df431a565751078a153415be8.png";
import imgImageWithFallback4 from "figma:asset/abe840502af5932a5c2dfd5846c293ab7dc6c5c3.png";
import imgImageWithFallback5 from "figma:asset/6aaa86bd9a4a64846f9ab1f1f42eab73a7fd7f47.png";
import imgImageWithFallback6 from "figma:asset/01ae737e32aa5434abf98176393e87a36b898a8a.png";
import imgImageWithFallback7 from "figma:asset/15795bd7e420a26c97dbf289ee64bb2af7565459.png";

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-[173.213px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Georgia:Regular',sans-serif] leading-[36px] left-0 not-italic text-[#4a7c2c] text-[30px] top-[-0.2px] whitespace-nowrap">{`Page & Prose`}</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pl-[456.988px] pr-[457px] relative size-full">
          <Heading />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute bg-[#fdfbf7] content-stretch flex flex-col h-[69.6px] items-start left-0 pb-[1.6px] pt-[16px] px-[32px] top-0 w-[1151.2px]" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#a68a64] border-b-[1.6px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[16px] size-[64px] top-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Icon">
          <path d={svgPaths.p8652380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.33333" />
          <path d={svgPaths.paab5900} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-[#4a7c2c] left-[368px] rounded-[26843500px] size-[96px] top-0" data-name="Container">
      <Icon />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[40px] left-0 top-[120px] w-[832px]" data-name="Heading 1">
      <p className="-translate-x-1/2 absolute font-['Georgia:Regular',sans-serif] leading-[40px] left-[416.09px] not-italic text-[#2c2416] text-[36px] text-center top-[-0.8px] whitespace-nowrap">Thank you for your order!</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[28px] left-0 top-[172px] w-[832px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-[415.79px] not-italic text-[#6b5d4f] text-[18px] text-center top-[-1.4px] whitespace-nowrap">Your order has been confirmed and will be shipped soon.</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[200px] left-[32px] top-[64px] w-[832px]" data-name="Container">
      <Container3 />
      <Heading1 />
      <Paragraph />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[390.61px] not-italic text-[#6b5d4f] text-[14px] text-center top-[-0.2px] whitespace-nowrap">Order Number</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[31.988px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Georgia:Regular',sans-serif] leading-[32px] left-[390.56px] not-italic text-[#4a7c2c] text-[24px] text-center top-[-0.4px] whitespace-nowrap">PP-2026-047283</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[8px] h-[111.188px] items-start left-[32px] pb-[1.6px] pt-[25.6px] px-[25.6px] rounded-[10px] top-[312px] w-[832px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d4c4b0] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[24px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3bfee9c0} id="Vector" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 22V12" id="Vector_2" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3.29 7L12 12L20.71 7" id="Vector_3" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7.5 4.27L16.5 9.42" id="Vector_4" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <Icon1 />
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-[32px] not-italic text-[#2c2416] text-[20px] top-[-0.6px] whitespace-nowrap">Your Books</p>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[108.8px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[112px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <ImageWithFallback />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[598.45px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2c2416] text-[16px] top-[0.2px] whitespace-nowrap">The Midnight Library</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[598.45px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">by Matt Haig</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.963px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">Hardback</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[9.588px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">×</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">Qty: 1</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[20px] items-center left-0 top-[56px] w-[598.45px]" data-name="Container">
      <Text />
      <Text1 />
      <Text2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[76px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading3 />
        <Paragraph1 />
        <Container13 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[28px] relative shrink-0 w-[54.35px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£16.99</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[16px] h-[112px] items-start relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
      <Container14 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="h-[108.8px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[112px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <ImageWithFallback1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[596.263px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2c2416] text-[16px] top-[0.2px] whitespace-nowrap">The Silent Patient</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[596.263px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">by Alex Michaelides</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[63.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">Paperback</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[9.588px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">×</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">Qty: 2</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[20px] items-center left-0 top-[56px] w-[596.263px]" data-name="Container">
      <Text3 />
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] h-[76px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading4 />
        <Paragraph2 />
        <Container18 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[28px] relative shrink-0 w-[56.538px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£25.98</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[16px] h-[112px] items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
      <Container19 />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="h-[108.8px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[112px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <ImageWithFallback2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[598.45px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#2c2416] text-[16px] top-[0.2px] whitespace-nowrap">Project Hail Mary</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[598.45px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">by Andy Weir</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.963px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">Hardback</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[9.588px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">×</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">Qty: 1</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[20px] items-center left-0 top-[56px] w-[598.45px]" data-name="Container">
      <Text6 />
      <Text7 />
      <Text8 />
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[76px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading5 />
        <Paragraph3 />
        <Container23 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[28px] relative shrink-0 w-[54.35px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£16.99</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[16px] h-[112px] items-start relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
      <Container24 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[368px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container15 />
      <Container20 />
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[28px] relative shrink-0 w-[79.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#2c2416] text-[18px] top-[-1.4px] whitespace-nowrap">Total Paid</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[31.988px] relative shrink-0 w-[74.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Georgia:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#4a7c2c] text-[24px] top-[-0.4px] whitespace-nowrap">£63.95</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[31.988px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col h-[57.588px] items-start pt-[25.6px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-solid border-t-[1.6px] inset-0 pointer-events-none" />
      <Container26 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[501.587px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container9 />
      <Container25 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p26ddc800} id="Vector" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35ba4680} id="Vector_2" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon2 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[28px] not-italic text-[#2c2416] text-[14px] top-[-0.2px] whitespace-nowrap">Delivery Address</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal h-[91px] leading-[22.75px] not-italic relative shrink-0 text-[#6b5d4f] text-[14px] w-full whitespace-nowrap" data-name="Container">
      <p className="absolute left-0 top-[-0.4px]">John Doe</p>
      <p className="absolute left-0 top-[22.35px]">123 High Street</p>
      <p className="absolute left-0 top-[45.1px]">London, SW1A 1AA</p>
      <p className="absolute left-0 top-[67.85px]">United Kingdom</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[#f5efe7] content-stretch flex flex-col gap-[12px] h-[163px] items-start left-0 pt-[20px] px-[20px] rounded-[10px] top-0 w-[370.4px]" data-name="Container">
      <Heading6 />
      <Container29 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon3 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[28px] not-italic text-[#2c2416] text-[14px] top-[-0.2px] whitespace-nowrap">Estimated Delivery</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="font-['Inter:Regular',sans-serif] font-normal h-[45.5px] not-italic relative shrink-0 text-[#6b5d4f] w-full whitespace-nowrap" data-name="Container">
      <p className="absolute leading-[22.75px] left-0 text-[14px] top-[-0.4px]">March 20-22, 2026</p>
      <p className="absolute leading-[16px] left-0 text-[12px] top-[24.75px]">Standard Delivery (5-7 business days)</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[#f5efe7] content-stretch flex flex-col gap-[12px] h-[163px] items-start left-[394.4px] pt-[20px] px-[20px] rounded-[10px] top-0 w-[370.4px]" data-name="Container">
      <Heading7 />
      <Container31 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[163px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container30 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[32px] h-[763.788px] items-start left-[32px] pb-[1.6px] pt-[33.6px] px-[33.6px] rounded-[10px] top-[455.19px] w-[832px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d4c4b0] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container8 />
      <Container27 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p67fd620} id="Vector" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M15 18H9" id="Vector_2" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2beec100} id="Vector_3" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p13934880} id="Vector_4" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1ff3c700} id="Vector_5" stroke="var(--stroke-0, #4A7C2C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[rgba(74,124,44,0.1)] relative rounded-[26843500px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[28px] left-0 top-0 w-[700.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#2c2416] text-[18px] top-[-0.8px] whitespace-nowrap">Track Your Order</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[20px] left-0 top-[36px] w-[700.8px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b5d4f] text-[14px] top-[-0.2px] whitespace-nowrap">{`Your tracking number will be activated once your order ships. You'll receive an email with tracking updates.`}</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Tracking Number</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Consolas:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] whitespace-nowrap">TRK9847562341GB</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-[#f5efe7] flex-[1_0_0] h-[65.588px] min-h-px min-w-px relative rounded-[10px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-[0.8px] pt-[12.8px] px-[16.8px] relative size-full">
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#4a7c2c] h-[48px] relative rounded-[10px] shrink-0 w-[132.063px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[66px] not-italic text-[16px] text-center text-white top-[9.8px] whitespace-nowrap">Track Order</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[65.588px] items-center left-0 top-[72px] w-[700.8px]" data-name="Container">
      <Container37 />
      <Button />
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1_0_0] h-[137.588px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading8 />
        <Paragraph4 />
        <Container36 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[16px] h-[137.588px] items-start relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[204.788px] items-start left-[32px] pb-[1.6px] pt-[33.6px] px-[33.6px] rounded-[10px] top-[1250.98px] w-[832px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d4c4b0] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container33 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[390.78px] not-italic text-[#92400e] text-[14px] text-center top-[-0.2px] whitespace-nowrap">📧 A confirmation email has been sent to your email address with your order details and receipt.</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute bg-[#fef3c7] content-stretch flex flex-col h-[71.2px] items-start left-[32px] pb-[1.6px] pt-[25.6px] px-[25.6px] rounded-[10px] top-[1487.76px] w-[832px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f59e0b] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Paragraph5 />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute h-[24px] left-[377.81px] top-[1590.96px] w-[140.375px]" data-name="Link">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[70.5px] not-italic text-[#4a7c2c] text-[16px] text-center top-[-2.2px] whitespace-nowrap">Continue Shopping</p>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[31.988px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Georgia:Regular',sans-serif] leading-[32px] left-[416.35px] not-italic text-[#2c2416] text-[24px] text-center top-[-0.4px] whitespace-nowrap">You May Also Like</p>
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback3 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute h-[20px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] whitespace-nowrap">Atomic Habits</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[40px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">James Clear</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[63.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£13.99</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[107.988px] relative shrink-0 w-full" data-name="Container">
      <Heading10 />
      <Paragraph6 />
      <Container46 />
    </div>
  );
}

function OrderConfirmationPage1() {
  return (
    <div className="absolute bg-[#f5efe7] h-[336.25px] left-[12px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container44 />
        <Container45 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback4() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback4 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute h-[20px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] whitespace-nowrap">Beach Read</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[40px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Emily Henry</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[63.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£13.99</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[107.988px] relative shrink-0 w-full" data-name="Container">
      <Heading11 />
      <Paragraph7 />
      <Container49 />
    </div>
  );
}

function OrderConfirmationPage2() {
  return (
    <div className="absolute bg-[#f5efe7] h-[336.25px] left-[208px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container47 />
        <Container48 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback5() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback5} />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback5 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute h-[40px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] w-[103px]">The Name of the Wind</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[60px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Patrick Rothfuss</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[83.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£15.99</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[127.988px] relative shrink-0 w-full" data-name="Container">
      <Heading12 />
      <Paragraph8 />
      <Container52 />
    </div>
  );
}

function OrderConfirmationPage3() {
  return (
    <div className="absolute bg-[#f5efe7] h-[356.25px] left-[404px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container50 />
        <Container51 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback6() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback6} />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback6 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute h-[40px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] w-[130px]">The Seven Husbands of Evelyn Hugo</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[60px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Taylor Jenkins Reid</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[83.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£12.99</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[127.988px] relative shrink-0 w-full" data-name="Container">
      <Heading13 />
      <Paragraph9 />
      <Container55 />
    </div>
  );
}

function OrderConfirmationPage4() {
  return (
    <div className="absolute bg-[#f5efe7] h-[356.25px] left-[600px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container53 />
        <Container54 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback7() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback7} />
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback7 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="absolute h-[20px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] whitespace-nowrap">Educated</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[40px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Tara Westover</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[63.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£14.99</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[107.988px] relative shrink-0 w-full" data-name="Container">
      <Heading14 />
      <Paragraph10 />
      <Container58 />
    </div>
  );
}

function OrderConfirmationPage5() {
  return (
    <div className="absolute bg-[#f5efe7] h-[336.25px] left-[796px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container56 />
        <Container57 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback8() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback8 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="absolute h-[20px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] whitespace-nowrap">Atomic Habits</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[40px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">James Clear</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[63.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£13.99</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[107.988px] relative shrink-0 w-full" data-name="Container">
      <Heading15 />
      <Paragraph11 />
      <Container61 />
    </div>
  );
}

function OrderConfirmationPage6() {
  return (
    <div className="absolute bg-[#f5efe7] h-[336.25px] left-[992px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container59 />
        <Container60 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback9() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback9 />
    </div>
  );
}

function Heading16() {
  return (
    <div className="absolute h-[20px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] whitespace-nowrap">Beach Read</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[40px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Emily Henry</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[63.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£13.99</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[107.988px] relative shrink-0 w-full" data-name="Container">
      <Heading16 />
      <Paragraph12 />
      <Container64 />
    </div>
  );
}

function OrderConfirmationPage7() {
  return (
    <div className="absolute bg-[#f5efe7] h-[336.25px] left-[1188px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container62 />
        <Container63 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback10() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback5} />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback10 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="absolute h-[40px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] w-[103px]">The Name of the Wind</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[60px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Patrick Rothfuss</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[83.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£15.99</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[127.988px] relative shrink-0 w-full" data-name="Container">
      <Heading17 />
      <Paragraph13 />
      <Container67 />
    </div>
  );
}

function OrderConfirmationPage8() {
  return (
    <div className="absolute bg-[#f5efe7] h-[356.25px] left-[1384px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container65 />
        <Container66 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback11() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback6} />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback11 />
    </div>
  );
}

function Heading18() {
  return (
    <div className="absolute h-[40px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] w-[130px]">The Seven Husbands of Evelyn Hugo</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[60px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Taylor Jenkins Reid</p>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[83.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£12.99</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[127.988px] relative shrink-0 w-full" data-name="Container">
      <Heading18 />
      <Paragraph14 />
      <Container70 />
    </div>
  );
}

function OrderConfirmationPage9() {
  return (
    <div className="absolute bg-[#f5efe7] h-[356.25px] left-[1580px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container68 />
        <Container69 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback12() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback7} />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback12 />
    </div>
  );
}

function Heading19() {
  return (
    <div className="absolute h-[20px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] whitespace-nowrap">Educated</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[40px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Tara Westover</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[63.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£14.99</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[107.988px] relative shrink-0 w-full" data-name="Container">
      <Heading19 />
      <Paragraph15 />
      <Container73 />
    </div>
  );
}

function OrderConfirmationPage10() {
  return (
    <div className="absolute bg-[#f5efe7] h-[336.25px] left-[1776px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container71 />
        <Container72 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback13() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback13 />
    </div>
  );
}

function Heading20() {
  return (
    <div className="absolute h-[20px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] whitespace-nowrap">Atomic Habits</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[40px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">James Clear</p>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[63.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£13.99</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[107.988px] relative shrink-0 w-full" data-name="Container">
      <Heading20 />
      <Paragraph16 />
      <Container76 />
    </div>
  );
}

function OrderConfirmationPage11() {
  return (
    <div className="absolute bg-[#f5efe7] h-[336.25px] left-[1972px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container74 />
        <Container75 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback14() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback14 />
    </div>
  );
}

function Heading21() {
  return (
    <div className="absolute h-[20px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] whitespace-nowrap">Beach Read</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[40px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Emily Henry</p>
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[63.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£13.99</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[107.988px] relative shrink-0 w-full" data-name="Container">
      <Heading21 />
      <Paragraph17 />
      <Container79 />
    </div>
  );
}

function OrderConfirmationPage12() {
  return (
    <div className="absolute bg-[#f5efe7] h-[336.25px] left-[2168px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container77 />
        <Container78 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ImageWithFallback15() {
  return (
    <div className="h-[225.063px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback5} />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col h-[225.063px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback15 />
    </div>
  );
}

function Heading22() {
  return (
    <div className="absolute h-[40px] left-[16px] overflow-clip top-[16px] w-[136.8px]" data-name="Heading 3">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#2c2416] text-[14px] top-[-0.4px] w-[103px]">The Name of the Wind</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[16px] top-[60px] w-[136.8px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px]">Patrick Rothfuss</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute h-[28px] left-[16px] top-[83.99px] w-[136.8px]" data-name="Container">
      <p className="absolute font-['Georgia:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#4a7c2c] text-[18px] top-[-0.8px] whitespace-nowrap">£15.99</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="h-[127.988px] relative shrink-0 w-full" data-name="Container">
      <Heading22 />
      <Paragraph18 />
      <Container82 />
    </div>
  );
}

function OrderConfirmationPage13() {
  return (
    <div className="absolute bg-[#f5efe7] h-[356.25px] left-[2364px] rounded-[10px] top-0 w-[172px]" data-name="OrderConfirmationPage">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.6px] relative rounded-[inherit] size-full">
        <Container80 />
        <Container81 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8dcc8] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Track() {
  return (
    <div className="h-[362px] relative shrink-0 w-full" data-name="Track2">
      <OrderConfirmationPage1 />
      <OrderConfirmationPage2 />
      <OrderConfirmationPage3 />
      <OrderConfirmationPage4 />
      <OrderConfirmationPage5 />
      <OrderConfirmationPage6 />
      <OrderConfirmationPage7 />
      <OrderConfirmationPage8 />
      <OrderConfirmationPage9 />
      <OrderConfirmationPage10 />
      <OrderConfirmationPage11 />
      <OrderConfirmationPage12 />
      <OrderConfirmationPage13 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col h-[362px] items-start left-0 overflow-clip pl-[-784px] pr-[-983.2px] top-0 w-[781px]" data-name="Container">
      <Track />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M15 18L9 12L15 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PrevArrow() {
  return (
    <div className="absolute bg-[#4a7c2c] content-stretch flex items-center justify-center left-[-16px] px-[8px] rounded-[26843500px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-[40px] top-[160.93px]" data-name="PrevArrow">
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NextArrow() {
  return (
    <div className="absolute bg-[#4a7c2c] content-stretch flex items-center justify-center left-[756.8px] px-[8px] rounded-[26843500px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-[40px] top-[160.93px]" data-name="NextArrow">
      <Icon6 />
    </div>
  );
}

function InnerSlider() {
  return (
    <div className="h-[361.85px] relative shrink-0 w-full" data-name="InnerSlider2">
      <Container43 />
      <PrevArrow />
      <NextArrow />
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-white h-[413.05px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d4c4b0] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-[1.6px] pt-[25.6px] px-[25.6px] relative size-full">
        <InnerSlider />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[469.038px] items-start left-[32px] top-[1678.96px] w-[832px]" data-name="Container">
      <Heading9 />
      <Container42 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[2212px] left-[127.6px] top-[69.6px] w-[896px]" data-name="Container">
      <Container2 />
      <Container4 />
      <Container7 />
      <Container32 />
      <Container40 />
      <Link />
      <Container41 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[416.01px] not-italic text-[#6b5d4f] text-[14px] text-center top-[-0.2px] whitespace-nowrap">Need help? Contact us at support@pageandprose.com or call 0800 123 4567</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6b5d4f] text-[12px] text-center">{`© 2026 Page & Prose. All rights reserved.`}</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[43.987px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start px-[32px] relative size-full">
        <Paragraph19 />
        <Paragraph20 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#fdfbf7] content-stretch flex flex-col h-[109.588px] items-start left-0 pt-[33.6px] px-[127.6px] top-[2345.6px] w-[1151.2px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#d4c4b0] border-solid border-t-[1.6px] inset-0 pointer-events-none" />
      <Container83 />
    </div>
  );
}

function OrderConfirmationPage() {
  return (
    <div className="bg-[#f5efe7] h-[2455.188px] relative shrink-0 w-full" data-name="OrderConfirmationPage">
      <Navigation />
      <Container1 />
      <Footer />
    </div>
  );
}

export default function OrderComfirmedPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Order Comfirmed page">
      <OrderConfirmationPage />
    </div>
  );
}