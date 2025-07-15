import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import './TempoRespostaGrafico.css';

function TempoRespostaGrafico({ dados }) {
  if (!dados.length) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>📊 Tempo de Resposta das APIs (ms)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="url" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tempoRespostaMs" fill="#8884d8">
            <LabelList dataKey="tempoRespostaMs" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TempoRespostaGrafico;
