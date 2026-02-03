import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './features/auth/Login';
import { AppLayout } from './components/layout/AppLayout';
import { MainDashboard } from './features/dashboard/MainDashboard';
import { DocumentExplorer } from './features/documents/DocumentExplorer';
import { UserPermissions } from './features/admin/UserPermissions';
import { UploadAndIndexing } from './features/documents/UploadAndIndexing';
import { ViewerAndHistory } from './features/documents/ViewerAndHistory';
import { WorkflowDesigner } from './features/workflows/WorkflowDesigner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Layout Routes */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/documents" element={<DocumentExplorer />} />
          <Route path="/admin/permissions" element={<UserPermissions />} />
          <Route path="/inbox" element={<div className="p-8">Inbox Feature Coming Soon</div>} />
          <Route path="/reports" element={<div className="p-8">Reports Feature Coming Soon</div>} />
          <Route path="/settings" element={<div className="p-8">Settings Feature Coming Soon</div>} />
        </Route>

        {/* Protected Standalone Routes */}
        <Route path="/upload" element={<ProtectedRoute><UploadAndIndexing /></ProtectedRoute>} />
        <Route path="/viewer" element={<ProtectedRoute><ViewerAndHistory /></ProtectedRoute>} />
        <Route path="/workflows" element={<ProtectedRoute><WorkflowDesigner /></ProtectedRoute>} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
