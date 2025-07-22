import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './StatusApisGrafico.css';

const cores = {
  online: '#00C49F',
  offline: '#FF8042'
};

function StatusApisGrafico({ dados }) {
  if (!dados.length) return null;

  const totalOnline = dados.filter(api => api.status === 'online').length;
  const totalOffline = dados.length - totalOnline;

  const chartData = [
    { name: 'Online', value: totalOnline },
    { name: 'Offline', value: totalOffline },
  ];

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2><img className="icone-grafico-status" src="../src/assets/images/antena.png" alt="grafico status" /> Status das APIs</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[entry.name.toLowerCase()]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusApisGrafico;
