import svgPaths from "./svg-ux17qp4qvp";

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-[200.086px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[21px] top-[-0.5px] tracking-[-0.3589px] whitespace-nowrap">Firm-wide Drill Down</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[17.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 10.2083">
            <path d={svgPaths.p10a10000} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 10.2083">
            <path d={svgPaths.p2726e300} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45833" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[8.75px] shrink-0 size-[31.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[7px] px-[7px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[31.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Button />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24.5px] left-0 not-italic text-[#4a5565] text-[15.75px] top-0 tracking-[-0.2922px] whitespace-nowrap">Cash Runway</p>
    </div>
  );
}

function DrillDownPanel() {
  return (
    <div className="bg-white h-[106px] relative shrink-0 w-full" data-name="DrillDownPanel">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[7px] items-start pb-px pt-[21px] px-[28px] relative size-full">
        <Container1 />
        <Heading1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_5_743)" id="Icon">
          <path d={svgPaths.p115b3700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.6667 1.75V4.08333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.8333 2.91667H10.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.33333 9.91667V11.0833" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.91667 10.5H1.75" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_5_743">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative rounded-[8.75px] shrink-0 size-[28px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-[81.938px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24.5px] left-0 not-italic text-[#101828] text-[15.75px] top-0 tracking-[-0.2922px] whitespace-nowrap">AI Analysis</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[7px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Heading2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Current Runway: 74 days</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#364153] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Daily Burn Rate: $18,234</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[12.25px] top-[2.63px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 12.25">
        <g id="Icon">
          <path d={svgPaths.p1981380} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
          <path d={svgPaths.p120a9880} id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[17.5px] left-[15.75px] top-0 w-[37.625px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#e7000b] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Trend:</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon2 />
      <Text />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-[56.88px] not-italic text-[#364153] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">{` ↓ Decreasing (was 78 days last week)`}</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[3.5px] h-[59.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[35px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#364153] text-[12.25px] top-[0.5px] tracking-[-0.0179px] w-[500px]">{`Based on your current spending patterns and revenue pipeline, your runway is trending downward. You're 16 days short of your Q1 goal of 90 days.`}</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#4a5565] text-[0px] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">
        <span className="leading-[14px]">Confidence:</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[14px]">{` High (95%) - Based on 12 months of data`}</span>
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[129.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#eff6ff] h-[166.5px] relative rounded-[12.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#dbeafe] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[18.5px] px-[18.5px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[208.5px] items-start relative shrink-0 w-full" data-name="Section">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_5_712)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1426c1f0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p206e4880} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_5_712">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative rounded-[8.75px] shrink-0 size-[28px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 201, 80) 0%, rgb(0, 166, 62) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-[156.18px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24.5px] left-0 not-italic text-[#101828] text-[15.75px] top-0 tracking-[-0.2922px] whitespace-nowrap">Goal Impact Analysis</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[7px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Heading3 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#364153] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Q1 Goals Affected:</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[76.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#4a5565] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Cash Runway</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[45.383px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">74 days</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[14px] relative shrink-0 w-[3.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#6a7282] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">/</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[17.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#4a5565] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">90 days</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_5_736)" id="Icon">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 4.66667V7" id="Vector_2" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 9.33333H7.00583" id="Vector_3" stroke="var(--stroke-0, #D08700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_5_736">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[129.445px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7px] items-center relative size-full">
        <Text2 />
        <Text3 />
        <Text4 />
        <Icon4 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[31.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Container11 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph5 />
      <Container10 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#364153] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Scenario Modeling:</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[259.688px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Scenario 1: Convert Unbilled Time ($52.5K)</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex h-[17.5px] items-center justify-between left-[16px] pr-[252.313px] top-[16px] w-[512px]" data-name="Container">
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[14px] left-[16px] top-[40.5px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#4a5565] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Invoice all 90+ day aged unbilled time</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[14px] left-0 top-0 w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#364153] text-[0px] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">
        <span className="leading-[14px]">Timeline:</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[14px]">{` 2-3 weeks`}</span>
      </p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[14px] left-0 top-[17.5px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#364153] text-[0px] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">
        <span className="leading-[14px]">Effort:</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[14px]">{` Low (invoices ready to send)`}</span>
      </p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[14px] left-0 top-[10.5px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#101828] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Impact:</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[28px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Runway: 74 days → 86 days (+12 days)</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[42px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Goal Progress: 82% → 96%</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[56px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Still 4 days short of goal</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute border-[#e5e7eb] border-solid border-t h-[71px] left-0 top-[42px] w-[512px]" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[113px] left-[16px] top-[65px] w-[512px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
      <Container17 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#f9fafb] h-[194px] relative rounded-[12.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <Container15 />
      <Paragraph8 />
      <Container16 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[243.219px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Scenario 2: Collect Overdue AR ($73.7K)</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex h-[17.5px] items-center justify-between left-[16px] pr-[268.781px] top-[16px] w-[512px]" data-name="Container">
      <Paragraph15 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[14px] left-[16px] top-[40.5px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#4a5565] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Follow up on 3 high-risk invoices</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[14px] left-0 top-0 w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#364153] text-[0px] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">
        <span className="leading-[14px]">Timeline:</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[14px]">{` 1-2 weeks`}</span>
      </p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[14px] left-0 top-[17.5px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#364153] text-[0px] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">
        <span className="leading-[14px]">Effort:</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[14px]">{` Medium (follow-up required)`}</span>
      </p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[14px] left-0 top-[10.5px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#101828] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Impact:</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[28px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Runway: 74 days → 81 days (+7 days)</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[42px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Goal Progress: 82% → 90%</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[56px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Still 9 days short of goal</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[70px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• BONUS: Also improves DSO goal</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute border-[#e5e7eb] border-solid border-t h-[85px] left-0 top-[42px] w-[512px]" data-name="Container">
      <Paragraph19 />
      <Paragraph20 />
      <Paragraph21 />
      <Paragraph22 />
      <Paragraph23 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[127px] left-[16px] top-[65px] w-[512px]" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
      <Container21 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#f9fafb] h-[208px] relative rounded-[12.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <Container19 />
      <Paragraph16 />
      <Container20 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[194.063px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Scenario 3: Combined Approach</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="bg-[#00a63e] h-[18.5px] relative rounded-[3.5px] shrink-0 w-[96.945px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-[7px] not-italic text-[10px] text-white top-[2.25px] tracking-[0.1172px] uppercase whitespace-nowrap">Recommended</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex h-[18.5px] items-center justify-between left-[16px] top-[16px] w-[512px]" data-name="Container">
      <Paragraph24 />
      <Text5 />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[14px] left-[16px] top-[41.5px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#4a5565] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Invoice unbilled time AND collect overdue AR</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[14px] left-0 top-0 w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#364153] text-[0px] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">
        <span className="leading-[14px]">Timeline:</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[14px]">{` 3-4 weeks`}</span>
      </p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[14px] left-0 top-[17.5px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#364153] text-[0px] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">
        <span className="leading-[14px]">Effort:</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[14px]">{` Medium`}</span>
      </p>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="absolute h-[14px] left-0 top-[10.5px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#101828] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Impact:</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[28px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Runway: 74 days → 93 days (+19 days)</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[42px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Goal Progress: 82% → 103% ✅ EXCEEDS GOAL</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[14px] left-[7px] top-[56px] w-[505px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• BONUS: Also improves DSO and Operating Margin</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute border-[#e5e7eb] border-solid border-t h-[71px] left-0 top-[42px] w-[512px]" data-name="Container">
      <Paragraph28 />
      <Paragraph29 />
      <Paragraph30 />
      <Paragraph31 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[113px] left-[16px] top-[66px] w-[512px]" data-name="Container">
      <Paragraph26 />
      <Paragraph27 />
      <Container25 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[195px] relative rounded-[12.75px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(160.279deg, rgb(240, 253, 244) 0%, rgb(239, 246, 255) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-[#7bf1a8] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <Container23 />
      <Paragraph25 />
      <Container24 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[618px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container18 />
      <Container22 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[10.5px] h-[646px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph6 />
      <Container13 />
    </div>
  );
}

function Section1() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[758px] items-start relative shrink-0 w-full" data-name="Section">
      <Container7 />
      <Container9 />
      <Container12 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_5_723)" id="Icon">
          <path d={svgPaths.p38014980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pb95800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1914c880} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.83333 3.5H8.16667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.83333 5.83333H8.16667" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.83333 8.16667H8.16667" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.83333 10.5H8.16667" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_5_723">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#4a5565] relative rounded-[8.75px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-[198.164px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24.5px] left-0 not-italic text-[#101828] text-[15.75px] top-0 tracking-[-0.2922px] whitespace-nowrap">Firm-wide Data Drill-Down</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex gap-[7px] h-[28px] items-center left-0 top-0 w-[544px]" data-name="Container">
      <Container27 />
      <Heading4 />
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[14px] left-0 top-[42px] w-[544px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#6a7282] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Click any level to expand details. Click items in expanded view to switch selection.</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_5_750)" id="Icon">
          <path d={svgPaths.p38014980} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pb95800} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1914c880} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.83333 3.5H8.16667" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.83333 5.83333H8.16667" id="Vector_5" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.83333 8.16667H8.16667" id="Vector_6" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.83333 10.5H8.16667" id="Vector_7" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_5_750">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#6a7282] text-[10.5px] top-0 tracking-[0.0923px] uppercase whitespace-nowrap">Firm</p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Current Cash Runway</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] h-[31.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph33 />
        <Paragraph34 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[151.352px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.5px] items-center relative size-full">
        <Icon6 />
        <Container32 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="flex-[1_0_0] h-[17.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">74 Days</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[72.977px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.5px] items-center relative size-full">
        <Text6 />
        <Icon7 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex h-[31.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container33 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[63.5px] items-start left-0 pb-[2px] pt-[16px] px-[16px] rounded-[12.75px] top-0 w-[544px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <Container30 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1977ee80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3471a100} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#6a7282] text-[10.5px] top-0 tracking-[0.0923px] uppercase whitespace-nowrap">Component</p>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Daily Burn Rate</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="flex-[1_0_0] h-[31.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph35 />
        <Paragraph36 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[114.758px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.5px] items-center relative size-full">
        <Icon8 />
        <Container37 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[14px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#6a7282] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Based on 90 days</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[77.383px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">$18,234/day</p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[202.07px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.5px] items-center relative size-full">
        <Text7 />
        <Text8 />
        <Icon9 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex h-[31.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Container38 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[63.5px] items-start left-[16px] pb-[2px] pt-[16px] px-[16px] rounded-[12.75px] top-[70.5px] w-[528px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <Container35 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M7 1.16667V12.8333" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p231c2b00} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#6a7282] text-[10.5px] top-0 tracking-[0.0923px] uppercase whitespace-nowrap">Component</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">{`Available Cash & Receivables`}</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="flex-[1_0_0] h-[31.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph37 />
        <Paragraph38 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-[195.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.5px] items-center relative size-full">
        <Icon10 />
        <Container42 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[17.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">$1.35M</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-[69.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10.5px] items-center relative size-full">
        <Text9 />
        <Icon11 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex h-[31.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <Container43 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[63.5px] items-start left-[32px] pb-[2px] pt-[16px] px-[16px] rounded-[12.75px] top-[141px] w-[512px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <Container40 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[204.5px] left-0 top-[66.5px] w-[544px]" data-name="Container">
      <Container29 />
      <Container34 />
      <Container39 />
    </div>
  );
}

function Section2() {
  return (
    <div className="h-[271px] relative shrink-0 w-full" data-name="Section">
      <Container26 />
      <Paragraph32 />
      <Container28 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_5_743)" id="Icon">
          <path d={svgPaths.p115b3700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.6667 1.75V4.08333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.8333 2.91667H10.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.33333 9.91667V11.0833" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M2.91667 10.5H1.75" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_5_743">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative rounded-[8.75px] shrink-0 size-[28px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(173, 70, 255) 0%, rgb(43, 127, 255) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7px] relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-[172.711px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24.5px] left-0 not-italic text-[#101828] text-[15.75px] top-0 tracking-[-0.2922px] whitespace-nowrap">Recommended Actions</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[7px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Heading5 />
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[17.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[17.5px] left-0 not-italic text-[#4a5565] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Prioritized by impact:</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[14px] relative shrink-0 w-[5.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative rounded-[16777200px] shrink-0 size-[21px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(173, 70, 255) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7.766px] relative size-full">
        <Text10 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[17.5px] left-0 top-0 w-[475.5px]" data-name="Heading 5">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Invoice Top 3 Aged Unbilled Matters</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="absolute h-[14px] left-0 top-[21px] w-[475.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#4a5565] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Send invoices for aged unbilled time to improve runway</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.5px] tracking-[0.1172px] uppercase whitespace-nowrap">Impact</p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#00a63e] text-[10.5px] top-0 tracking-[0.0923px] w-[131px]">+9 days runway (74 → 83 days)</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.75px] h-[44.75px] items-start left-0 top-0 w-[153.828px]" data-name="Container">
      <Paragraph41 />
      <Paragraph42 />
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.5px] tracking-[0.1172px] uppercase whitespace-nowrap">Effort</p>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#101828] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Low</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.75px] h-[44.75px] items-start left-[160.83px] top-0 w-[153.836px]" data-name="Container">
      <Paragraph43 />
      <Paragraph44 />
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.5px] tracking-[0.1172px] uppercase whitespace-nowrap">Timeline</p>
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#101828] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">This week</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.75px] h-[44.75px] items-start left-[321.66px] top-0 w-[153.828px]" data-name="Container">
      <Paragraph45 />
      <Paragraph46 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute h-[44.75px] left-0 top-[45.5px] w-[475.5px]" data-name="Container">
      <Container52 />
      <Container53 />
      <Container54 />
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">{`• Venture Partners M&A: $18.2K (95 days aged)`}</p>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Tech Startup Inc: $12.4K (87 days aged)</p>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Harbor LLC: $8.9K (82 days aged)</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[3.5px] h-[70px] items-start left-0 pt-[10.5px] px-[10.5px] rounded-[8.75px] top-[100.75px] w-[475.5px]" data-name="Container">
      <Paragraph47 />
      <Paragraph48 />
      <Paragraph49 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-gradient-to-r from-[#155dfc] h-[28px] relative rounded-[6.75px] shrink-0 to-[#9810fa] w-[102.57px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10.5px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[12.25px] text-center text-white tracking-[-0.0179px] whitespace-nowrap">Send Invoices</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[28px] relative rounded-[6.75px] shrink-0 w-[109.125px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[11.5px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[12.25px] text-center tracking-[-0.0179px] whitespace-nowrap">Preview Drafts</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex gap-[7px] h-[28px] items-start left-0 top-[181.25px] w-[475.5px]" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container50() {
  return (
    <div className="flex-[475.5_0_0] h-[209.25px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading6 />
        <Paragraph40 />
        <Container51 />
        <Container55 />
        <Container56 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[10.5px] h-[209.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-white h-[256.75px] relative rounded-[12.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[18.5px] px-[18.5px] relative size-full">
        <Container48 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[14px] relative shrink-0 w-[6.852px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative rounded-[16777200px] shrink-0 size-[21px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(173, 70, 255) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.07px] pr-[7.078px] relative size-full">
        <Text11 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[17.5px] left-0 top-0 w-[475.5px]" data-name="Heading 5">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Accelerate Collections on 3 High-Risk AR</p>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="absolute h-[14px] left-0 top-[21px] w-[475.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#4a5565] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Follow up on overdue invoices within 3 business days</p>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.5px] tracking-[0.1172px] uppercase whitespace-nowrap">Impact</p>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#00a63e] text-[10.5px] top-0 tracking-[0.0923px] w-[128px]">+7 days runway (74 → 81 days)</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.75px] h-[44.75px] items-start left-0 top-0 w-[153.828px]" data-name="Container">
      <Paragraph51 />
      <Paragraph52 />
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.5px] tracking-[0.1172px] uppercase whitespace-nowrap">Effort</p>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#101828] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Medium</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.75px] h-[44.75px] items-start left-[160.83px] top-0 w-[153.836px]" data-name="Container">
      <Paragraph53 />
      <Paragraph54 />
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.5px] tracking-[0.1172px] uppercase whitespace-nowrap">Timeline</p>
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#101828] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">3 business days</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.75px] h-[44.75px] items-start left-[321.66px] top-0 w-[153.828px]" data-name="Container">
      <Paragraph55 />
      <Paragraph56 />
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute h-[44.75px] left-0 top-[45.5px] w-[475.5px]" data-name="Container">
      <Container62 />
      <Container63 />
      <Container64 />
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Acme Corp: $32.5K (18 days overdue)</p>
    </div>
  );
}

function Paragraph58() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Tech Solutions: $24.2K (15 days overdue)</p>
    </div>
  );
}

function Paragraph59() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Global Industries: $17K (12 days overdue)</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[3.5px] h-[70px] items-start left-0 pt-[10.5px] px-[10.5px] rounded-[8.75px] top-[100.75px] w-[475.5px]" data-name="Container">
      <Paragraph57 />
      <Paragraph58 />
      <Paragraph59 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-gradient-to-r from-[#155dfc] h-[28px] relative rounded-[6.75px] shrink-0 to-[#9810fa] w-[171.32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10.5px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[12.25px] text-center text-white tracking-[-0.0179px] whitespace-nowrap">Send Payment Reminders</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[28px] relative rounded-[6.75px] shrink-0 w-[167.813px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[11.5px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[12.25px] text-center tracking-[-0.0179px] whitespace-nowrap">View Collection Strategy</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute content-stretch flex gap-[7px] h-[28px] items-start left-0 top-[181.25px] w-[475.5px]" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container60() {
  return (
    <div className="flex-[475.5_0_0] h-[209.25px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading7 />
        <Paragraph50 />
        <Container61 />
        <Container65 />
        <Container66 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[10.5px] h-[209.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container59 />
      <Container60 />
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-white h-[256.75px] relative rounded-[12.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[18.5px] px-[18.5px] relative size-full">
        <Container58 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[14px] relative shrink-0 w-[7.117px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[14px] left-0 not-italic text-[10.5px] text-white top-0 tracking-[0.0923px] whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative rounded-[16777200px] shrink-0 size-[21px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(173, 70, 255) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.938px] pr-[6.945px] relative size-full">
        <Text12 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[17.5px] left-0 top-0 w-[475.5px]" data-name="Heading 5">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[17.5px] left-0 not-italic text-[#101828] text-[12.25px] top-[0.5px] tracking-[-0.0179px] whitespace-nowrap">Review Discretionary Spending</p>
    </div>
  );
}

function Paragraph60() {
  return (
    <div className="absolute h-[14px] left-0 top-[21px] w-[475.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#4a5565] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Identify opportunities to reduce burn rate</p>
    </div>
  );
}

function Paragraph61() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.5px] tracking-[0.1172px] uppercase whitespace-nowrap">Impact</p>
    </div>
  );
}

function Paragraph62() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#00a63e] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">+3-5 days runway</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.75px] h-[30.75px] items-start left-0 top-0 w-[153.828px]" data-name="Container">
      <Paragraph61 />
      <Paragraph62 />
    </div>
  );
}

function Paragraph63() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.5px] tracking-[0.1172px] uppercase whitespace-nowrap">Effort</p>
    </div>
  );
}

function Paragraph64() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#101828] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">Low</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.75px] h-[30.75px] items-start left-[160.83px] top-0 w-[153.836px]" data-name="Container">
      <Paragraph63 />
      <Paragraph64 />
    </div>
  );
}

function Paragraph65() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.5px] tracking-[0.1172px] uppercase whitespace-nowrap">Timeline</p>
    </div>
  );
}

function Paragraph66() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[#101828] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">This week</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.75px] h-[30.75px] items-start left-[321.66px] top-0 w-[153.828px]" data-name="Container">
      <Paragraph65 />
      <Paragraph66 />
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute h-[30.75px] left-0 top-[45.5px] w-[475.5px]" data-name="Container">
      <Container72 />
      <Container73 />
      <Container74 />
    </div>
  );
}

function Paragraph67() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Research/Subscriptions: $8.4K/mo</p>
    </div>
  );
}

function Paragraph68() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-0 not-italic text-[#364153] text-[10.5px] top-0 tracking-[0.0923px] whitespace-nowrap">• Professional Development: $3.2K/mo</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[3.5px] h-[52.5px] items-start left-0 pt-[10.5px] px-[10.5px] rounded-[8.75px] top-[86.75px] w-[475.5px]" data-name="Container">
      <Paragraph67 />
      <Paragraph68 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-gradient-to-r from-[#155dfc] h-[28px] relative rounded-[6.75px] shrink-0 to-[#9810fa] w-[122.32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10.5px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[12.25px] text-center text-white tracking-[-0.0179px] whitespace-nowrap">Review Expenses</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[28px] relative rounded-[6.75px] shrink-0 w-[160.031px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[11.5px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] not-italic relative shrink-0 text-[#0a0a0a] text-[12.25px] text-center tracking-[-0.0179px] whitespace-nowrap">Optimize Subscriptions</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex gap-[7px] h-[28px] items-start left-0 top-[149.75px] w-[475.5px]" data-name="Container">
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container70() {
  return (
    <div className="flex-[475.5_0_0] h-[177.75px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading8 />
        <Paragraph60 />
        <Container71 />
        <Container75 />
        <Container76 />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex gap-[10.5px] h-[177.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <Container70 />
    </div>
  );
}

function Container67() {
  return (
    <div className="bg-white h-[225.25px] relative rounded-[12.75px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[18.5px] px-[18.5px] relative size-full">
        <Container68 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[766.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <Container57 />
      <Container67 />
    </div>
  );
}

function Section3() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[840.25px] items-start relative shrink-0 w-full" data-name="Section">
      <Container44 />
      <Paragraph39 />
      <Container46 />
    </div>
  );
}

function DrillDownPanel1() {
  return (
    <div className="h-[2203.75px] relative shrink-0 w-full" data-name="DrillDownPanel">
      <div className="content-stretch flex flex-col gap-[28px] items-start pt-[21px] px-[28px] relative size-full">
        <Section />
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] size-full" data-name="Container">
      <DrillDownPanel />
      <DrillDownPanel1 />
    </div>
  );
}