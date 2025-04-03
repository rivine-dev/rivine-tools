import QrGenerator from "@/components/custom/qr-code/qr-generator";

export default function QRCodeGenerator() {
  return (
      <QrGenerator type="text" initialValue="Hello"></QrGenerator>
  );
}
