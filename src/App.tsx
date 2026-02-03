import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './features/auth/Login';
import { AppLayout } from './components/layout/AppLayout';
import { MainDashboard } from './features/dashboard/MainDashboard';
import { DocumentExplorer } from './features/documents/DocumentExplorer';
import { UserPermissions } from './features/admin/UserPermissions';
import { UploadAndIndexing } from './features/documents/UploadAndIndexing';
import { ViewerAndHistory } from './features/documents/ViewerAndHistory';
import { WorkflowDesigner } from './features/workflows/WorkflowDesigner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Layout Routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/documents" element={<DocumentExplorer />} />
          <Route path="/admin/permissions" element={<UserPermissions />} />
          {/* Fallback for now */}
          <Route path="/inbox" element={<div className="p-8">Inbox Feature Coming Soon</div>} />
          <Route path="/reports" element={<div className="p-8">Reports Feature Coming Soon</div>} />
          <Route path="/settings" element={<div className="p-8">Settings Feature Coming Soon</div>} />
        </Route>

        {/* Standalone Routes */}
        <Route path="/upload" element={<UploadAndIndexing />} />
        <Route path="/viewer" element={<ViewerAndHistory />} />
        <Route path="/workflows" element={<WorkflowDesigner />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
