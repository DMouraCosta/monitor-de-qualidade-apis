import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

export const exportarParaDocx = (resultados) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "📊 Relatório de Monitoramento de APIs",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 300 },
          }),
          ...resultados.map((api) =>
            new Paragraph({
              children: [
                new TextRun({ text: `🔗 URL: ${api.url}`, bold: true }),
                new TextRun({ text: `\n✅ Status: ${api.status.toUpperCase()}` }),
                new TextRun({ text: `\n📟 Código HTTP: ${api.httpCode}` }),
                new TextRun({ text: `\n⏱️ Tempo de Resposta: ${api.tempoRespostaMs} ms\n`, break: 1 }),
              ],
              spacing: { after: 200 },
            })
          ),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, 'Relatorio_APIs.docx');
  });
};
